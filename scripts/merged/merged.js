
// ============================
// composables/Utils/search/fetchGooglePlaces.js
// ============================

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
    else if (types.includes("sublocality") || types.includes("neighborhood")) address.street2 = component.long_name;
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
                if (!imageUrl && details?.photos?.length > 0) {
                  imageUrl = details.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 });
                }
                if (!imageUrl && details?.icon) {
                  imageUrl = details.icon;
                }
                return {
                  name: place.name || "",
                  formatted_address: details?.formatted_address || "",
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
            const sortedResults = enrichedResults.sort((a, b) => a.distance - b.distance).slice(0, MAX_RESULTS);
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


// ============================
// composables/Utils/search/googleMapsLoader.js
// ============================

// composables/Utils/search/googleMapsLoader.js
// File: composables/Utils/search/googleMapsLoader.js
import { useRuntimeConfig } from "#imports";

let googleMapsScriptLoaded = false;

export const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (googleMapsScriptLoaded) {
      resolve(window.google);
      return;
    }
    if (typeof window.google === "object" && typeof window.google.maps === "object") {
      googleMapsScriptLoaded = true;
      resolve(window.google);
      return;
    }
    if (document.querySelector("script[data-google-maps]")) {
      console.warn("Google Maps script is already being loaded.");
      return;
    }
    const script = document.createElement("script");
    const config = useRuntimeConfig();
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";
    script.onload = () => {
      if (window.google && window.google.maps) {
        googleMapsScriptLoaded = true;
        console.log("✅ Google Maps SDK loaded successfully.");
        resolve(window.google);
      } else {
        reject(new Error("❌ Google Maps SDK failed to load properly."));
      }
    };
    script.onerror = () => {
      reject(new Error("❌ Error loading Google Maps SDK"));
    };
    document.head.appendChild(script);
  });
};


// ============================
// composables/Utils/search/locationUtils.js
// ============================

// composables/Utils/search/locationUtils.js
// File: composables/Utils/search/locationUtils.js
const DEFAULT_LOCATION = { lat: 51.5074, lng: -0.1278 }; // London fallback

/**
 * Determines a valid location by prioritizing:
 * 1. Passed location → 2. MiseboxUser location → 3. Default fallback.
 */
export const getValidLocation = (passedLocation, miseboxUser = null) => {
  if (passedLocation?.lat && passedLocation?.lng) return passedLocation;
  if (miseboxUser?.location?.lat && miseboxUser?.location?.lng) return miseboxUser.location;
  console.warn("[LocationUtils] No valid location found, defaulting to London.");
  return DEFAULT_LOCATION;
};


// ============================
// composables/Utils/search/useDebounce.js
// ============================

// composables/Utils/search/useDebounce.js
// File: composables/Utils/search/useDebounce.js
export const useDebounce = (fn, delay = 300) => {
  let timeout = null;
  const debouncedFunction = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, delay);
  };
  return { debouncedFunction };
};


// ============================
// composables/Utils/search/useFirestoreGoogleMergeSearch.js
// ============================

// composables/Utils/search/useFirestoreGoogleMergeSearch.js
// File: composables/Utils/search/useFirestoreGoogleMergeSearch.js

const DEFAULT_LOCATION = { lat: 51.5074, lng: -0.1278 };

export const useFirestoreGoogleMergeSearch = (collectionName, keywords = [], passedLocation = null) => {
  const radius = 5000; // Default search radius

  // Get current MiseboxUser for fallback
  const { currentMiseboxUser } = useMiseboxUser();

  // Determine valid location: passedLocation > MiseboxUser.location > default
  const validLocation = computed(() => {
    return passedLocation?.lat && passedLocation?.lng
      ? passedLocation
      : currentMiseboxUser?.location?.lat && currentMiseboxUser?.location?.lng
      ? currentMiseboxUser.location
      : DEFAULT_LOCATION;
  });

  // Firestore search logic
  const { firestoreResults, firestorePlaceIds, searchFirestore } = useFirestoreMergeSearch(collectionName);

  // Google search composable (pass validLocation.value)
  const { searchQuery, googleResults, searchGoogle, clearSearch, isSearchingGoogle } = useGoogleSearch(
    keywords,
    validLocation.value,
    radius
  );

  const isSearchingFirestore = ref(false);

  watch(searchQuery, async (newQuery) => {
    if (!newQuery || newQuery.trim().length < 2) {  // Allow 2+ character queries
      console.log("[useFirestoreGoogleMergeSearch] Query too short. Clearing results.");
      firestoreResults.value = [];
      googleResults.value = [];
      return;
    }
    console.log("[useFirestoreGoogleMergeSearch] Searching Firestore...");
    isSearchingFirestore.value = true;
    await searchFirestore(newQuery);
    isSearchingFirestore.value = false;
    if (firestoreResults.value.length < 10) {
      console.log(
        `[useFirestoreGoogleMergeSearch] Firestore has ${firestoreResults.value.length} results. Searching Google with radius ${radius}m...`
      );
      isSearchingGoogle.value = true;
      searchGoogle(newQuery, radius);
    } else {
      console.log("[useFirestoreGoogleMergeSearch] Firestore has sufficient results. Skipping Google search.");
      googleResults.value = [];
    }
  });

  return {
    searchQuery,
    firestoreResults,
    googleResults,
    mergedResults: computed(() => [
      ...firestoreResults.value,
      ...googleResults.value.filter(gResult => !firestorePlaceIds.value.includes(gResult.place_id))
    ]),
    searchFirestore,
    searchGoogle,
    clearSearch,
    isSearchingFirestore,
    isSearchingGoogle,
    validLocation,
  };
};


// ============================
// composables/Utils/search/useFirestoreMergeSearch.js
// ============================

// composables/Utils/search/useFirestoreMergeSearch.js
// File: composables/Utils/search/useFirestoreMergeSearch.js
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useFirestoreMergeSearch = (collectionName) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, collectionName);
  const firestoreResults = ref([]);
  const firestorePlaceIds = ref([]);

  const searchFirestore = async (query) => {
    if (!query || query.trim().length < 2) { // Allow 2+ characters
      console.log("[searchFirestore] Query too short. Clearing results.");
      firestoreResults.value = [];
      return;
    }
    const normalizedQuery = query.trim().toLowerCase();
    try {
      const querySnapshot = await getDocs(collectionRef);
      console.log(`[searchFirestore] Found ${querySnapshot.docs.length} documents in ${collectionName}`);
      firestoreResults.value = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data(), source: "firestore" }))
        .filter(result => {
          if (!result.search_terms) return false;
          if (Array.isArray(result.search_terms)) {
            return result.search_terms.some(term => term.toLowerCase().includes(normalizedQuery));
          }
          if (typeof result.search_terms === "string") {
            return result.search_terms.toLowerCase().includes(normalizedQuery);
          }
          return false;
        });
      console.log(`[searchFirestore] Returning ${firestoreResults.value.length} filtered results.`);
    } catch (error) {
      console.error(`[searchFirestore] Error in ${collectionName}:`, error);
    }
  };

  return {
    firestoreResults,
    firestorePlaceIds,
    searchFirestore,
  };
};


// ============================
// composables/Utils/search/useFirestoreSearch.js
// ============================

// composables/Utils/search/useFirestoreSearch.js
// File: composables/Utils/search/useFirestoreSearch.js
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useFirestoreSearch = (collectionName) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, collectionName);
  const results = ref([]);

  const searchFirestore = async (query) => {
    if (!query || query.trim().length < 3) {
      results.value = [];
      return;
    }
    const normalizedQuery = query.trim().toLowerCase();
    try {
      const querySnapshot = await getDocs(collectionRef);
      const mappedResults = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        source: "firestore",
      }));
      results.value = mappedResults.filter(result => {
        if (!result.search_terms) return false;
        if (Array.isArray(result.search_terms)) {
          return result.search_terms.some(term => term.toLowerCase().includes(normalizedQuery));
        }
        if (typeof result.search_terms === "string") {
          return result.search_terms.toLowerCase().includes(normalizedQuery);
        }
        return false;
      });
    } catch (error) {
      console.error(`[searchFirestore] Error in ${collectionName}:`, error);
    }
  };

  return {
    results,
    searchFirestore,
  };
};


// ============================
// composables/Utils/search/useGoogleSearch.js
// ============================

// composables/Utils/search/useGoogleSearch.js
// File: composables/Utils/search/useGoogleSearch.js

export const useGoogleSearch = (passedLocation = null, radius = 5000, miseboxUser = null) => {
  const searchQuery = ref("");
  const googleResults = ref([]);
  const lastSearchedQuery = ref("");
  const isSearchingGoogle = ref(false);

  // Use helper to get the best available location.
  const validLocation = ref(getValidLocation(passedLocation, miseboxUser));

  // Watch for updates to passedLocation and miseboxUser.location
  watch(
    () => [passedLocation, miseboxUser?.location],
    ([newPassedLocation, newMiseboxLocation]) => {
      validLocation.value = getValidLocation(newPassedLocation, { location: newMiseboxLocation });
    },
    { immediate: true, deep: true }
  );

  const { debouncedFunction } = useDebounce(async () => {
    const trimmedQuery = searchQuery.value.trim();
    if (trimmedQuery.length < 3) {
      console.log("[useGoogleSearch] Query too short. Clearing results.");
      googleResults.value = [];
      return;
    }
    if (!validLocation.value?.lat || !validLocation.value?.lng) {
      console.error("[useGoogleSearch] ❌ No valid location! Ensure { lat, lng } is set.");
      return;
    }
    if (trimmedQuery === lastSearchedQuery.value) {
      console.log("[useGoogleSearch] Skipping duplicate query:", trimmedQuery);
      return;
    }
    lastSearchedQuery.value = trimmedQuery;
    isSearchingGoogle.value = true;
    console.log(
      `🌍 [Google API] Searching "${trimmedQuery}" within ${radius}m at (${validLocation.value.lat}, ${validLocation.value.lng})`
    );
    try {
      const google = await loadGoogleMapsScript();
      googleResults.value = await fetchGooglePlacesData(trimmedQuery, google, validLocation.value, radius);
    } catch (error) {
      console.error("[useGoogleSearch] ❌ Error searching Google Places:", error);
    } finally {
      isSearchingGoogle.value = false;
    }
  });

  const searchGoogle = () => {
    if (!validLocation.value?.lat || !validLocation.value?.lng) {
      console.error("[useGoogleSearch] ❌ Cannot search Google Places without valid location.");
      return;
    }
    debouncedFunction();
  };

  const clearSearch = () => {
    searchQuery.value = "";
    googleResults.value = [];
    lastSearchedQuery.value = "";
  };

  return {
    searchQuery,
    googleResults,
    searchGoogle,
    clearSearch,
    isSearchingGoogle,
    validLocation, // For debugging purposes
  };
};

