// composables/EntityManagers/recruiter/recruiterSearch.js
// File: composables/EntityManagers/recruiter/recruiterSearch.js

export const useRecruiterSearch = (location) => {
  // Define an extended list of keywords for recruitment businesses in food, hospitality, and related industries.
  const keywords = [
    "Food Recruiter",
    "Hospitality Recruiter",
    "Culinary Recruitment",
    "Restaurant Jobs",
    "Hospitality Jobs",
    "Food Service Recruitment",
    "Chef Recruitment",
    "Catering Recruitment",
    "Hospitality Staffing",
    "Food Industry Jobs",
    "Culinary Talent",
    "Restaurant Staffing",
    "Hospitality Talent Acquisition",
    "Food & Beverage Recruitment",
    "Hospitality Careers",
    "Culinary Careers",
    "F&B Staffing",
    "Gastronomy Recruitment",
    "Service Industry Recruitment",
    "Cruise Ship Recruitment",
    "Canteen Recruitment",
    "Cruise Line Jobs",
    "Catering Services Recruitment",
    "Resort Recruitment",
    "Banquet Staffing"
  ];

  // Pass the collection name "recruiters", keywords, and the location.
  return useFirestoreGoogleMergeSearch("recruiters", keywords, location);
};
