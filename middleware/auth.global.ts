export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const isAuthPage = to.path === '/auth/login' || to.path === '/auth/register' || to.path === '/auth/forget-password' || to.path === '/auth/reset-password' || to.path === '/auth/verification';

    if (isAuthPage && isAuthenticated) {
        return navigateTo('/')
    }

    if (!isAuthPage && !isAuthenticated) {
        return navigateTo('/auth/login')
    }
});