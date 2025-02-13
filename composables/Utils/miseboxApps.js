// composables/Utils/miseboxApps.js
// composables/miseboxApps.js
import appIcon from '@/assets/icons/appicon.jpg';

const miseboxApps = [
  {
    name: "Misebox",
    doc: "misebox-user",
    collection: "misebox-users",
    profileCollection: "misebox-user-profiles",
    isAvailable: true,
    welcome: "Welcome to the MiseBox Profile app",
    mottoOne: "Manage your central account and subscriptions",
    mottoTwo: "Connect with the Misebox ecosystem and expand your network",
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Assets%2FKitchen1.jpg?alt=media&token=2a9cf166-f8e7-402e-9d67-b287d1467156'
  },
  {
    name: "Agency",
    doc: "professional",
    collection: "professionals",
    profileCollection: "professional-profiles",
    isAvailable: true,
    welcome: "Welcome to the Agency app",
    mottoOne: "Professional: build your profile",
    mottoTwo: "Explore gig and job opportunities, connect and create your network", // Corrected spelling of "expüolere" to "Explore"
    icon: appIcon,
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Assets%2Fkitchen2.jpg?alt=media&token=20e3a409-9b03-4770-aa4d-933eab30be6b'
  },
  {
    name: "Chef",
    doc: "chef",
    collection: "chefs",
    profileCollection: "chef-profiles",
    isAvailable: true,
    welcome: "Welcome Chef",
    mottoOne: "Chef: manage your work",
    mottoTwo: "Add kitchens, recipes, mise tasks, and safety records to your system", // Corrected spelling of "saftey" to "safety"
    icon: appIcon,
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Assets%2FKitchen3.jpg?alt=media&token=2a9cf166-f8e7-402e-9d67-b287d1467156'
  },
  {
    name: "Recruiter",
    doc: "recruiter",
    collection: "recruiters",
    profileCollection: "recruiter-profiles",
    isAvailable: true,
    welcome: "Welcome Recruiter",
    mottoOne: "Recruiter: orchestrate your team",
    mottoTwo: "Headhunt or post positions, create your workforce in a system built by chefs", // Corrected spelling of "craete" to "create"
    icon: appIcon,
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Assets%2Fkitchen4.jpg?alt=media&token=20e3a409-9b03-4770-aa4d-933eab30be6b'
  }
];

// Helper function to get app by document type
export function getAppByDoc(doc) {
  return miseboxApps.find(app => app.doc === doc) || null;
}

// Helper function to get app by collection
export function getAppByCollection(collection) {
  return miseboxApps.find(app => app.collection === collection) || null;
}

export default miseboxApps;