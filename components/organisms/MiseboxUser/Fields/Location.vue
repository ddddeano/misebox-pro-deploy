<!-- components/organisms/MiseboxUser/Fields/Location.vue -->
<template>
  <div class="form-field location-field">
    <div class="top">
      <label>{{ label }}</label>
      <!-- Controls in the Header -->
      <div class="component-icons">
        <PencilIcon
          v-if="!isEditing"
          class="icon"
          @click="pencilButtonClicked"
        />
        <template v-else>
          <CheckCircleIcon class="icon" @click="checkButtonClicked" />
          <MinusCircleIcon class="icon" @click="minusButtonClicked" />
          <XCircleIcon
            v-if="hasValue"
            class="icon"
            @click="deleteButtonClicked"
          />
        </template>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span>{{ orderedFormattedValue }}</span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <div class="input-group">
        <label class="label">Location</label>
        <div class="location-selector">
          <input
            type="text"
            v-model="localValue.formatted_address"
            placeholder="Select Location"
            readonly
            class="dropdown-item"
          />
          <!-- Use MapPinIcon to open the map modal -->
          <MapPinIcon class="icon map-pin-btn" @click="openMap" />
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>

    <!-- Map Modal -->
    <div v-if="showMap" class="map-modal">
      <div class="map-modal-content">
        <div ref="mapContainer" class="map"></div>
        <div class="map-modal-actions">
          <button @click="closeMap" class="btn">Cancel</button>
          <button @click="confirmLocation" class="btn">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

// Helper function to extract a short address (e.g. "Kristiansand, Norway")
// from the full formatted address.
function getShortAddress(fullAddress) {
  const parts = fullAddress.split(',');
  if (parts.length >= 2) {
    const country = parts[parts.length - 1].trim();
    const cityPart = parts[parts.length - 2].trim();
    // Remove any leading zip code numbers from the city part.
    const city = cityPart.replace(/^\d+\s*/, '');
    return `${city}, ${country}`;
  }
  return fullAddress;
}

// Props (same as before)
const props = defineProps({
  label: { type: String, default: "Location" },
  firebaseValue: { type: Object, default: () => ({}) },
  collectionName: { type: String, required: true },
  documentID: { type: String, required: true },
  target: { type: String, required: true },
  placeholders: {
    type: Object,
    default: () => ({
      country: "Country",
      region: "Region",
    }),
  },
  formattingFunction: { type: Function, default: null },
  validationFunction: { type: Function, default: null },
});

const isEditing = ref(false);
const localValue = ref({ ...props.firebaseValue });
// Ensure we have the location properties to store our map data.
if (!localValue.value.formatted_address) {
  localValue.value.formatted_address = "";
  localValue.value.short_address = "";
  localValue.value.lat = "";
  localValue.value.lng = "";
}
const errorMessage = ref("");

// Show the short_address (if available) in display mode.
const orderedFormattedValue = computed(() => {
  return localValue.value.short_address || localValue.value.formatted_address || "Not Set";
});

const hasValue = computed(() =>
  localValue.value.lat && localValue.value.lng
);

const firestore = useFirestore();

// ----- Map Modal & Map Functions -----
const showMap = ref(false);
const mapContainer = ref(null);
let map = null;
let marker = null;
let geocoder = null;

// Assume loadGoogleMapsScript is available (auto-imported or globally registered)
const openMap = () => {
  showMap.value = true;
  nextTick(() => {
    initMap();
  });
};

const closeMap = () => {
  showMap.value = false;
};

const initMap = async () => {
  try {
    const google = await loadGoogleMapsScript();

    // Determine the center: use the selected location if available;
    // otherwise, attempt to use the user's current location, then fallback.
    let center = { lat: -34.397, lng: 150.644 };
    if (localValue.value.lat && localValue.value.lng) {
      center = {
        lat: Number(localValue.value.lat),
        lng: Number(localValue.value.lng),
      };
    } else if (navigator.geolocation) {
      try {
        center = await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Geolocation error:", error);
              resolve(center); // fallback to default center
            }
          );
        });
      } catch (err) {
        console.error("Error fetching geolocation:", err);
      }
    }

    map = new google.maps.Map(mapContainer.value, {
      center,
      zoom: 10,
    });
    geocoder = new google.maps.Geocoder();

    if (localValue.value.lat && localValue.value.lng) {
      marker = new google.maps.Marker({
        position: center,
        map,
      });
      map.setCenter(marker.getPosition());
    }

    // When the user clicks on the map, drop or move the marker and reverse geocode.
    map.addListener("click", (e) => {
      const clickedLocation = e.latLng;
      if (!marker) {
        marker = new google.maps.Marker({
          position: clickedLocation,
          map,
        });
      } else {
        marker.setPosition(clickedLocation);
      }
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const fullAddress = results[0].formatted_address;
          localValue.value.formatted_address = fullAddress;
          localValue.value.short_address = getShortAddress(fullAddress);
          localValue.value.lat = clickedLocation.lat();
          localValue.value.lng = clickedLocation.lng();
        } else {
          console.error("Geocoder failed: " + status);
        }
      });
    });
  } catch (error) {
    console.error("Error loading Google Maps:", error);
  }
};

const confirmLocation = () => {
  if (localValue.value.lat && localValue.value.lng) {
    closeMap();
  } else {
    alert("Please select a location on the map.");
  }
};

// ----- CRUD & Update Functions -----
const pencilButtonClicked = () => {
  errorMessage.value = "";
  localValue.value = { ...props.firebaseValue };
  if (!localValue.value.formatted_address) {
    localValue.value.formatted_address = "";
    localValue.value.short_address = "";
    localValue.value.lat = "";
    localValue.value.lng = "";
  }
  isEditing.value = true;
};

const checkButtonClicked = async () => {
  isEditing.value = false;
  await updateField();
};

const minusButtonClicked = () => {
  errorMessage.value = "";
  localValue.value = { ...props.firebaseValue };
  if (!localValue.value.formatted_address) {
    localValue.value.formatted_address = "";
    localValue.value.short_address = "";
    localValue.value.lat = "";
    localValue.value.lng = "";
  }
  isEditing.value = false;
};

const deleteButtonClicked = async () => {
  localValue.value = {};
  await updateField();
  isEditing.value = true;
};

const validateInput = async () => {
  errorMessage.value = "";
  if (props.validationFunction) {
    const validationResult = await props.validationFunction(localValue.value);
    if (validationResult) {
      errorMessage.value = validationResult;
      return false;
    }
  }
  return true;
};

const updateField = async () => {
  const isValid = await validateInput();
  if (!isValid) return;

  // Check that latitude and longitude are valid numbers.
  const lat = Number(localValue.value.lat);
  const lng = Number(localValue.value.lng);
  if (isNaN(lat) || isNaN(lng)) {
    errorMessage.value = "Invalid location coordinates.";
    return;
  }

  const formattedValue = props.formattingFunction
    ? props.formattingFunction(localValue.value)
    : localValue.value;
  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, { [props.target]: formattedValue });
    errorMessage.value = "";
  } catch (error) {
    console.error("Error updating location in Firestore:", error);
    errorMessage.value = "Error saving location.";
  }
};
</script>

<style scoped>
/* Minimal CSS additions for the map modal */
.map-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.map-modal-content {
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
}
.map {
  width: 100%;
  height: 400px;
}
.map-modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

/* Align the location selector elements */
.location-selector {
  display: flex;
  align-items: center;
}

.map-pin-btn {
  margin-left: 8px;
  cursor: pointer;
}
</style>
