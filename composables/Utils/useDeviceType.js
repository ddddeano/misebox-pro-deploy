// composables/Utils/useDeviceType.js
// composables/useDeviceType.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useDeviceType() {
  const deviceType = ref('')

  // Define breakpoints with more precise orientation ranges
  const breakpoints = {
    mobilePortrait: 375,
    mobileLandscape: 600, // Adjusted to avoid overlap
    tabletPortrait: 768,
    tabletLandscape: 1024,
    desktop: 1440,
  }

  // Function to detect device type based on screen width
  const updateDeviceType = () => {
    const width = window.innerWidth
    if (width <= breakpoints.mobilePortrait) {
      deviceType.value = 'Mobile (Portrait)'
    } else if (width > breakpoints.mobilePortrait && width <= breakpoints.mobileLandscape) {
      deviceType.value = 'Mobile (Landscape)'
    } else if (width > breakpoints.mobileLandscape && width <= breakpoints.tabletPortrait) {
      deviceType.value = 'Tablet (Portrait)'
    } else if (width > breakpoints.tabletPortrait && width <= breakpoints.tabletLandscape) {
      deviceType.value = 'Tablet (Landscape)'
    } else {
      deviceType.value = 'Desktop'
    }
  }

  // Update device type on mount and when resizing the window
  onMounted(() => {
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType)
  })

  return {
    deviceType,
  }
}
