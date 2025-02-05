export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const isAuthPage = to.path === '/login' || to.path === '/register' || to.path === '/forget-password';
    const isPageMustAuth = to.path === '/profile' || to.path === '/quizzies';

    if (isAuthPage && isAuthenticated) {
        return navigateTo('/')
    }

    if (!isAuthPage && !isAuthenticated && isPageMustAuth) {
        return navigateTo('/login')
    }
});