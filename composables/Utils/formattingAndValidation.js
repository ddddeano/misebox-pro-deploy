// composables/Utils/formattingAndValidation.js
// composables/EntityManagers/utils/formattingAndValidation.js
// utils/formattingAndValidation.js

// -----------------------
// DISPLAY NAME
// -----------------------
export function formatTitleTrim(value) {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function validateTitleTrim(value) {
  if (!value || value.trim().length < 3) {
    return "Display name must be at least 3 characters.";
  }
  const forbiddenCharacters = /[^a-zA-Z0-9 ]/;
  if (forbiddenCharacters.test(value)) {
    return "Display name can only contain letters, numbers, and spaces.";
  }
  return "";
}

// -----------------------
// HANDLE
// -----------------------
export function formatHandle(value) {
  if (!value) return "";
  const cleaned = value.trim().toLowerCase();
  return cleaned.startsWith("@") ? cleaned.slice(1) : cleaned;
}

export function validateHandle(value) {
  if (!value || value.trim().length < 3) {
    return "Handle must be at least 3 characters.";
  }
  if (value.startsWith("@")) {
    return "Handle should not include '@'.";
  }
  return "";
}

// -----------------------
// SHORT BIO
// -----------------------
export function formatShortBio(value) {
  if (!value) return "";
  return value.trim().replace(/\n/g, "<br>");
}

export function validateShortBio(value) {
  if (!value || value.trim().length === 0) {
    return "Short bio is required.";
  }
  if (value.length > 450) {
    return "Short bio cannot exceed 450 characters.";
  }
  return "";
}

// -----------------------
// LONG BIO
// -----------------------
export function formatLongBio(value) {
  if (!value) return "";
  return value.trim().replace(/\n/g, "<br>");
}

export function validateLongBio(value) {
  if (!value || value.trim().length === 0) {
    return "Long bio is required.";
  }
  if (value.length > 1000) {
    return "Long bio cannot exceed 1000 characters.";
  }
  return "";
}

// -----------------------
// EMAIL
// -----------------------
export function formatEmail(value) {
  return value ? value.trim().toLowerCase() : "";
}

export function validateEmail(value) {
  if (!value) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email address.";
}

// -----------------------
// PHONE NUMBER
// -----------------------
export function formatPhoneNumber(value) {
  return value ? value.replace(/\s+/g, " ").trim() : "";
}

export function validatePhoneNumber(value) {
  if (!value) return "";
  const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
  return phoneRegex.test(value) ? "" : "Invalid phone number.";
}

// -----------------------
// DATE OF BIRTH
// -----------------------
export function formatDateOfBirth(dob) {
  return {
    day: dob?.day?.trim() || "",
    month: dob?.month?.trim() || "",
    year: dob?.year?.trim() || "",
  };
}

export function validateDateOfBirth({ day, month, year }) {
  if (!day && !month && !year) return "";
  const dNum = parseInt(day, 10),
    mNum = parseInt(month, 10),
    yNum = parseInt(year, 10);

  if (!dNum || !mNum || !yNum || isNaN(dNum) || isNaN(mNum) || isNaN(yNum)) {
    return "Invalid date of birth. Please provide a valid day, month, and year.";
  }
  if (dNum < 1 || dNum > 31) return "Invalid day provided.";
  if (mNum < 1 || mNum > 12) return "Invalid month provided.";
  const currentYear = new Date().getFullYear();
  if (yNum < 1900 || yNum > currentYear) {
    return `Year must be between 1900 and ${currentYear}.`;
  }
  const testDate = new Date(yNum, mNum - 1, dNum);
  return isNaN(testDate.getTime()) ? "Invalid date of birth." : "";
}

// -----------------------
// ADDRESS
// -----------------------
export function formatAddress(address) {
  return {
    number: address?.number?.trim() || "",
    street1: address?.street1?.trim() || "",
    street2: address?.street2?.trim() || "",
    town: address?.town ? formatDisplayName(address.town) : "",
    county: address?.county ? formatDisplayName(address.county) : "",
    postalCode: address?.postalCode?.trim() || "",
    country: address?.country ? formatDisplayName(address.country) : "",
  };
}

export function validateAddress({
  number,
  street1,
  street2,
  town,
  county,
  postalCode,
  country,
}) {
  if (
    !number &&
    !street1 &&
    !street2 &&
    !town &&
    !county &&
    !postalCode &&
    !country
  ) {
    return "";
  }

  if (!number || !street1 || !town || !county || !postalCode || !country) {
    return "All address fields are required.";
  }

  const postalCodeRegex = /^[0-9]{4,10}$/;
  if (!postalCodeRegex.test(postalCode)) {
    return "Invalid postal code format.";
  }
  if (street1.length < 3) {
    return "Street name must be at least 3 characters long.";
  }
  if (town.length < 2) {
    return "Town name must be at least 2 characters long.";
  }
  if (county.length < 2) {
    return "County/Region must be at least 2 characters long.";
  }
  if (country.length < 2) {
    return "Country name must be at least 2 characters long.";
  }
  return "";
}

// -----------------------
// SPECIALTIES
// -----------------------
export function formatSpecialty(value) {
  return value.trim();
}

export function validateSpecialty(value) {
  if (!value || value.trim().length < 2) {
    return "Specialty must be at least 2 characters.";
  }
  if (value.length > 50) {
    return "Specialty cannot exceed 50 characters.";
  }
  return "";
}

// -----------------------
// AVAILABILITY
// -----------------------
export function formatAvailability(availability) {
  return {
    day: availability.day.trim(),
    time_from: availability.time_from.trim(),
    time_to: availability.time_to.trim(),
  };
}

export function validateAvailability(availability) {
  if (
    !availability.day ||
    !availability.time_from ||
    !availability.time_to ||
    availability.time_from >= availability.time_to
  ) {
    return "Invalid availability: Ensure day, time from, and time to are correct.";
  }
  return "";
}

// -----------------------
// RECIPES
// -----------------------
export function formatRecipes(recipe) {
  return {
    name: recipe.name.trim(),
    ingredients: recipe.ingredients.trim(),
    instructions: recipe.instructions.trim(),
  };
}

export function validateRecipes(recipe) {
  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    return "All fields are required for a recipe.";
  }
  return "";
}

// -----------------------
// EVENTS
// -----------------------
export function formatEvents(event) {
  return {
    name: event.name.trim(),
    date: event.date.trim(),
    location: event.location.trim(),
    description: event.description.trim(),
  };
}

export function validateEvents(event) {
  if (!event.name || !event.date || !event.location) {
    return "Event name, date, and location are required.";
  }
  return "";
}

// -----------------------
// GALLERY
// -----------------------
export function formatGallery(image) {
  return {
    image_url: image.image_url.trim(),
    description: image.description.trim(),
  };
}

export function validateGallery(image) {
  if (!image.image_url) {
    return "Image URL is required.";
  }
  return "";
}
