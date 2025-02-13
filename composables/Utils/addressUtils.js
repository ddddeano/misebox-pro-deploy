// composables/Utils/addressUtils.js
// File: composables/Utils/addressUtils.js

/**
 * Computes a formatted address string by concatenating the address parts in a human-friendly way.
 * @param {Object} addr - An object containing the address components.
 * Expected keys: number, street1, street2, town, postalCode, country.
 * @returns {string} The formatted address.
 */
export const computeFormattedAddress = (addr) => {
  const parts = [];
  
  if (addr.street1) {
    // Combine the street name with the house number if provided.
    parts.push(addr.number ? `${addr.street1} ${addr.number}` : addr.street1);
  }
  
  if (addr.street2) {
    parts.push(addr.street2);
  }
  
  if (addr.postalCode || addr.town) {
    let townLine = "";
    if (addr.postalCode) {
      townLine += addr.postalCode;
    }
    if (addr.town) {
      townLine += (addr.postalCode ? " " : "") + addr.town;
    }
    parts.push(townLine);
  }
  
  if (addr.country) {
    parts.push(addr.country);
  }
  
  return parts.join(", ");
};

/**
 * Computes a short address string.
 * For example, it returns "London, United Kingdom" when given a town and a country.
 * @param {Object} addr - An object containing address components.
 * Expected keys: town, country.
 * @returns {string} The short address.
 */
export const computeShortAddress = (addr) => {
  if (addr.town && addr.country) {
    // Return the full country name rather than a country code.
    return `${addr.town}, ${addr.country}`;
  }
  return addr.country || "";
};
