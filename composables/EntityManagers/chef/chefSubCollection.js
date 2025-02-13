// composables/EntityManagers/chef/chefSubCollection.js
import { useCurrentUser } from 'vuefire'

export function useChefSubcollection() {
  const currentUser = useCurrentUser()
  const { createSubcollectionHelpers } = useMiseboxFirestore()

  // Dynamically create subcollection helpers
  function getIngredientHelpers() {
    const chefId = currentUser.value?.uid

    // Directly return the subcollection helpers
    return createSubcollectionHelpers('chefs', chefId, 'ingredients')
  }

  return {
    getIngredientHelpers,
  }
}
