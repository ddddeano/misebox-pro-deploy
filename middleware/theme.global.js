// theme.global.js

// Import the array of apps

// Default app configuration (use miseboxUser as default)
const defaultAppConfig = miseboxApps.find(app => app.doc === 'misebox-user');

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) { // Ensure this runs only on the client side
    // Determine which app configuration to use based on the route
    let appConfig = defaultAppConfig; // Set default configuration initially

    // Find the app configuration based on the route
    if (to.path.startsWith('/misebox-users')) {
      appConfig = miseboxApps.find(app => app.doc === 'misebox-user');
    } else if (to.path.startsWith('/professional')) {
      appConfig = miseboxApps.find(app => app.doc === 'professional');
    } else if (to.path.startsWith('/chef')) {
      appConfig = miseboxApps.find(app => app.doc === 'chef');
    } else if (to.path.startsWith('/recruiter')) {
      appConfig = miseboxApps.find(app => app.doc === 'recruiter');
    }

    // Check if appConfig was found, if not, log an error for debugging
    if (!appConfig) {
      console.error(`No app configuration found for path: ${to.path}`);
    } else {
      // Apply the theme styles using the determined or default app configuration
      applyThemeStyles();
    }
  }
});
