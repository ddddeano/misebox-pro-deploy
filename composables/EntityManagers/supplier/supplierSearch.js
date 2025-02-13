// composables/EntityManagers/supplier/supplierSearch.js
// File: composables/EntityManagers/supplier/supplierSearch.js

/**
 * useSupplierSearch defines supplier-specific keywords and accepts an optional location.
 * The location should be an object with {lat, lng} and will constrain the Google search to a 20km radius.
 */
export const useSupplierSearch = (location, additionalKeywords = []) => {
  const keywords = [
    "Food Supplier",
    "Culinary Supplier",
    "Grocery Supplier",
    "Restaurant Supplier",
    "Wholesale Food",
    "Organic Food Supplier",
    "Fresh Produce Supplier",
    "Ingredient Supplier",
    "Kitchen Supplies",
    "Beverage Supplier"
  ].concat(additionalKeywords);

  return useFirestoreGoogleMergeSearch("suppliers", keywords, location);
};
