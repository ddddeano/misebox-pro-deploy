// composables/Utils/search/fetchGooglePlaces.js
// File: composables/Utils/search/fetchGooglePlaces.js
import { loadGoogleMapsScript } from "./googleMapsLoader";

const MAX_RESULTS = 10; // Maximum results to return

/**
 * Calculates the distance (in km) between two lat/lng pairs.
 */
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg) => deg * (Math.PI / 180);

/**
 * Extracts the domain name from a URL, used for building a favicon URL.
 */
const extractDomain = (websiteUrl) => {
  if (!websiteUrl) return null;
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, "");
  } catch (error) {
    console.error("❌ Invalid URL:", websiteUrl, error);
    return null;
  }
};

/**
 * Parses address components into a structured address object.
 */
const parseAddressComponents = (components) => {
  const address = {
    number: "",
    street1: "",
    street2: "",
    town: "",
    county: "",
    postalCode: "",
    country: "",
  };

  if (!components || !components.length) return address;

  components.forEach((component) => {
    const types = component.types;
    if (types.includes("street_number")) address.number = component.long_name;
    else if (types.includes("route")) address.street1 = component.long_name;
    else if (types.includes("sublocality") || types.includes("neighborhood")) {
      address.street2 = component.long_name;
    }
    else if (types.includes("locality")) address.town = component.long_name;
    else if (types.includes("administrative_area_level_2")) address.county = component.long_name;
    else if (types.includes("postal_code")) address.postalCode = component.long_name;
    else if (types.includes("country")) address.country = component.long_name;
  });

  return address;
};

/**
 * Fetches detailed Google Place data using the Place Details API.
 */
const fetchPlaceDetails = (placeId, google) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    service.getDetails(
      {
        placeId,
        fields: ["name", "formatted_address", "address_components", "website", "icon", "photos", "geometry"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const structuredAddress = parseAddressComponents(place.address_components);
          let lat = null, lng = null;
          if (place.geometry?.location) {
            lat = place.geometry.location.lat();
            lng = place.geometry.location.lng();
          }
          resolve({
            name: place.name || "",
            formatted_address: place.formatted_address || "",
            address: structuredAddress,
            website: place.website || null,
            icon: place.icon || null,
            photos: place.photos || [],
            location: { lat, lng },
          });
        } else {
          console.warn("⚠️ Failed to fetch place details:", status);
          resolve(null);
        }
      }
    );
  });
};

/**
 * Fetches Google Places data (via textSearch) with location bias.
 * It enriches each result by fetching place details, extracts a favicon,
 * includes a short_address derived from the parsed address,
 * and returns results sorted by distance (limited to MAX_RESULTS).
 */
export const fetchGooglePlacesData = async (queryStr, google, location, radius = 5000) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!google || !google.maps || !google.maps.places) {
        google = await loadGoogleMapsScript();
      }

      if (!location || !location.lat || !location.lng) {
        console.error("❌ [Google Places] Missing valid location! Cannot proceed.");
        resolve([]);
        return;
      }

      const searchRadius = Number(radius) || 5000;
      console.log(
        `🌍 [Google API] Searching "${queryStr}" within ${searchRadius}m at (${location.lat}, ${location.lng})`
      );

      const service = new google.maps.places.PlacesService(document.createElement("div"));
      const allResults = [];

      const searchCallback = async (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          allResults.push(...results);
          if (pagination?.hasNextPage && allResults.length < MAX_RESULTS) {
            console.log("📌 Fetching next page of results...");
            pagination.nextPage();
          } else {
            const enrichedResults = await Promise.all(
              allResults.map(async (place) => {
                const details = await fetchPlaceDetails(place.place_id, google);
                const domain = extractDomain(details?.website);
                let imageUrl = domain
                  ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}`
                  : null;
                // Check if the generated favicon URL is a known generic placeholder.
                const placeholderPattern = /s2\/favicons\?sz=128&domain=(?:www\.)?google\.com/i;
                if (imageUrl && placeholderPattern.test(imageUrl)) {
                  imageUrl = null;
                }
                if (!imageUrl && details?.photos?.length > 0) {
                  imageUrl = details.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 });
                }
                if (!imageUrl && details?.icon) {
                  imageUrl = details.icon;
                }
                // Compute a short address: Prefer town, fallback to county if town is missing.
                let shortAddress = "";
                if (details && details.address) {
                  if (details.address.town) {
                    shortAddress = `${details.address.town}, ${details.address.country}`;
                  } else if (details.address.county) {
                    shortAddress = `${details.address.county}, ${details.address.country}`;
                  } else {
                    shortAddress = details.address.country || "";
                  }
                }
                return {
                  name: place.name || "",
                  formatted_address: details?.formatted_address || "",
                  short_address: shortAddress,
                  address: details?.address || {},
                  place_id: place.place_id || "",
                  website: details?.website || null,
                  image_url: imageUrl || null,
                  source: "google",
                  location: details?.location || {},
                  distance: getDistanceFromLatLonInKm(
                    location.lat,
                    location.lng,
                    place.geometry.location.lat(),
                    place.geometry.location.lng()
                  ),
                };
              })
            );
            const sortedResults = enrichedResults
              .sort((a, b) => a.distance - b.distance)
              .slice(0, MAX_RESULTS);
            console.log("🔍 Final Enriched Places Data:", sortedResults);
            resolve(sortedResults);
          }
        } else {
          console.warn("⚠️ No results found:", status);
          resolve([]);
        }
      };

      service.textSearch(
        {
          query: queryStr,
          location: new google.maps.LatLng(location.lat, location.lng),
          radius: searchRadius,
          locationBias: `circle:${searchRadius}@${location.lat},${location.lng}`,
        },
        searchCallback
      );
    } catch (error) {
      console.error("❌ Error fetching Google Places data:", error);
      reject(error);
    }
  });
};

/**
 * Initializes a Google Places search with a given radius.
 */
export const initializeGoogleSearch = async (query, userLocation, radius = 5000) => {
  try {
    const google = await loadGoogleMapsScript();
    return await fetchGooglePlacesData(query, google, userLocation, radius);
  } catch (error) {
    console.error("❌ Error initializing Google Places search:", error);
    return [];
  }
};

// Export helper functions (but do not duplicate fetchGooglePlacesData)
export { extractDomain, parseAddressComponents, fetchPlaceDetails };
