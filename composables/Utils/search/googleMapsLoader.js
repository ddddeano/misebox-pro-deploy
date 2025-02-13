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
