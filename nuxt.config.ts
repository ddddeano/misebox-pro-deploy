export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Update the compatibility date
  ssr: true, // Ensure SSR is enabled
  nitro: {
    preset: 'firebase', // Using Firebase preset for deployment
    firebase: {
      gen: 2, // Firebase generation 2
    },
  },
  devtools: { enabled: true }, // Enable devtools for debugging
  css: ['./assets/design-system/main.scss'], // Importing global styles
  modules: [
    [
      'nuxt-vuefire', 
      {
        credential: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Firebase credentials
        ssr: true, // Enable SSR support
      },
    ],
  ],

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    auth: {
      enabled: true, // Enable Firebase Authentication
      sessionCookies: true, // Enable session cookies for auth
    },
  },

  plugins: [
    '~/plugins/heroIcons.js', // Plugin for HeroIcons
    '~/plugins/firebase.client.js', // Updated: use the correct Firebase plugin file name
  ],
  

  runtimeConfig: {
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY, // Public Stripe key for payments
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // Google Maps API key
    },
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY, // Secret Stripe key (private)
    },
  },
  imports: {
    dirs: ['composables/**', 'components/**', 'assets/**/**'], // Auto-importing components, composables, and assets
  },
});
