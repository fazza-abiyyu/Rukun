// middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('isLoggedIn').value; // Cek status login
  const userRole = useCookie('user_role').value ?? 'User'; // Default ke 'User' jika null/undefined

  // Daftar halaman publik yang tidak memerlukan otentikasi
  const publicPages = ['/auth/login', '/auth/register', '/auth/forget-password', '/auth/reset-password', '/auth/verification', '/landing-page'];

  // Cek apakah halaman yang diminta adalah halaman publik
  const isPublicPage = publicPages.includes(to.path);

  // Jika pengguna belum login dan tidak mengakses halaman publik, redirect ke landing page
  if (!isPublicPage && !isAuthenticated) {
    return navigateTo('/landing-page', { redirectCode: 302 });
  }

  // Jika pengguna sudah login, cegah akses ke halaman login/registrasi
  const isAuthPage = ['/auth/login', '/auth/register', '/auth/forget-password', '/auth/reset-password', '/auth/verification'].includes(to.path);
  if (isAuthPage && isAuthenticated) {
    return navigateTo('/');
  }

  // Perbaikan logic role - Admin bisa akses semua, User hanya dashboard user
  if (userRole === 'Admin' && to.path.startsWith('/admin')) {
    // Admin boleh akses admin page
    return;
  }

  // User biasa tidak bisa akses halaman admin
  if (userRole === 'User' && to.path.startsWith('/admin')) {
    return navigateTo('/');
  }
});
