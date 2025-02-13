export default defineNuxtRouteMiddleware((to, from) => {
  const currentUser = useCurrentUser();

  watchEffect(() => {
    if (currentUser.value?.isAnonymous) {
      return navigateTo('/login');
    }
  });
});
