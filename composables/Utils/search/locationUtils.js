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
