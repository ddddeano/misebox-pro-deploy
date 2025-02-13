<!-- components/organisms/Professional/Fields/Location.vue -->
<template>
  <div class="location-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode object-array-cell">
      <MoleculesProfileDisplay
        :items="[
          localData.locations && localData.locations.length
            ? localData.locations[0].formatted_address + (localData.locations.length > 1 ? ' (+ ' + (localData.locations.length - 1) + ' more)' : '')
            : 'No location selected',
          'Radius: ' + localData.radius + ' km'
        ]"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Map-based Location Selector -->
      <div class="form-group">
        <label class="label">Place</label>
        <div class="location-selector">
          <input
            type="text"
            :value="markersSummary"
            placeholder="Select Locations"
            readonly
            class="editable-input"
          />
          <MapPinIcon class="icon map-pin-btn" @click="openMap" />
        </div>
      </div>

      <!-- Radius Slider -->
      <div class="form-group">
        <label class="label">Radius (km)</label>
        <input
          type="range"
          min="1"
          max="100"
          v-model="localData.radius"
          class="radius-slider"
        />
        <span>{{ localData.radius }} km</span>
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode object-array-cell">
      <div class="profile-edit">
        <MoleculesProfileDisplay
          :items="[
            localData.locations && localData.locations.length
              ? localData.locations[0].formatted_address + (localData.locations.length > 1 ? ' (+ ' + (localData.locations.length - 1) + ' more)' : '')
              : 'No location selected',
            'Radius: ' + localData.radius + ' km'
          ]"
        />
        <TrashIcon class="icon delete-icon" @click="submitDelete" />
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

const { addProfessionalArrayItem, removeProfessionalArrayItem } = useProfessional();

const props = defineProps({
  location: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
});

// localData stores an array of locations and the chosen radius
const localData = ref({
  locations: props.location.locations || [],
  radius: props.location.radius || 10,
});

// Computed summary to display in the input field
const markersSummary = computed(() => {
  if (localData.value.locations && localData.value.locations.length) {
    return localData.value.locations[0].formatted_address +
      (localData.value.locations.length > 1
        ? ` (+ ${localData.value.locations.length - 1} more)`
        : "");
  }
  return "No location selected";
});

// ----- Map Modal & Map Functions for Multiple Markers -----
const showMap = ref(false);
const mapContainer = ref(null);
let map = null;
let markers = []; // Array to store marker objects
let geocoder = null;

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

    // Determine center: if existing locations exist, center on the first; otherwise, use geolocation
    let center = { lat: -34.397, lng: 150.644 };
    if (localData.value.locations.length) {
      const first = localData.value.locations[0];
      center = { lat: Number(first.lat), lng: Number(first.lng) };
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
              resolve(center);
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

    // Clear any existing markers
    markers.forEach((m) => m.setMap(null));
    markers = [];

    // Add markers for existing locations
    localData.value.locations.forEach((loc) => {
      const marker = new google.maps.Marker({
        position: { lat: Number(loc.lat), lng: Number(loc.lng) },
        map,
      });
      marker.addListener("click", () => {
        marker.setMap(null);
        markers = markers.filter((m) => m !== marker);
        localData.value.locations = localData.value.locations.filter(
          (l) => l.lat !== loc.lat || l.lng !== loc.lng
        );
      });
      markers.push(marker);
    });

    // Add new marker on map click
    map.addListener("click", (e) => {
      const clickedLocation = e.latLng;
      const marker = new google.maps.Marker({
        position: clickedLocation,
        map,
      });
      marker.addListener("click", () => {
        marker.setMap(null);
        markers = markers.filter((m) => m !== marker);
        localData.value.locations = localData.value.locations.filter(
          (l) => l.lat !== clickedLocation.lat() || l.lng !== clickedLocation.lng()
        );
      });
      markers.push(marker);
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          localData.value.locations.push({
            formatted_address: results[0].formatted_address,
            lat: clickedLocation.lat(),
            lng: clickedLocation.lng(),
          });
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
  closeMap();
};

// ----- CRUD Functions -----
async function submitCreate() {
  try {
    await addProfessionalArrayItem("locations", localData.value);
    console.log("Location added successfully.");
  } catch (error) {
    console.error("Error adding location:", error);
  }
}

async function submitDelete() {
  try {
    await removeProfessionalArrayItem("locations", props.index);
    console.log("Location deleted successfully.");
  } catch (error) {
    console.error("Error deleting location:", error);
  }
}
</script>

<style scoped>
.editable-input {
  width: 100%;
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

/* Style the radius slider to match your app's styles */
.radius-slider {
  width: 100%;
  height: 2px;
  background: var(--border);
  outline: none;
  margin: 8px 0;
}
.radius-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  cursor: pointer;
}
.radius-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  cursor: pointer;
}

/* Map Modal CSS */
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
.btn {
  margin-left: 8px;
  padding: 8px 16px;
}
</style>
