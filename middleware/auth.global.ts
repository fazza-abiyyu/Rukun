export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const userRole = useCookie('user_role').value ?? 'User'; // Default ke 'User' jika null/undefined
    const isAuthPage = ['/auth/login', '/auth/register', '/auth/forget-password', '/auth/reset-password', '/auth/verification'].includes(to.path);

    // Jika pengguna sudah login, cegah akses ke halaman login/registrasi
    if (isAuthPage && isAuthenticated) {
        return navigateTo('/');
    }

    // Jika pengguna belum login, arahkan ke halaman login
    if (!isAuthPage && !isAuthenticated) {
        return navigateTo('/auth/login');
    }

    // Jika admin mencoba mengakses halaman khusus user, arahkan ke admin dashboard
    if (userRole === 'Admin' && to.path.startsWith('/user')) {
        return navigateTo('/admin/dashboard');
    }

    // Jika user biasa mencoba mengakses halaman admin, arahkan ke user dashboard
    if (userRole === 'User' && to.path.startsWith('/admin')) {
        return navigateTo('/user/dashboard');
    }
});
