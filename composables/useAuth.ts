import { jwtDecode } from "jwt-decode";

export default () => {
    // State untuk token dan user
    const useAuthToken = () => useState<string | null>('auth_token');
    const useAuthTokenCookie = () => useCookie<string | null>('access_token');
    const useAuthUser = () => useState<any>('auth_user');
    const useUserRole = () => useCookie<string | null>('user_role'); 
    const isLoggedIn = () => useCookie<boolean>('isLoggedIn');
    
    // State untuk mencegah multiple refresh bersamaan
    const isRefreshing = () => useState<boolean>('is_refreshing', () => false);

    // Menyimpan token ke state dan cookie
    const setToken = (newToken: string | null) => {
        useAuthToken().value = newToken;
        useAuthTokenCookie().value = newToken;
    };

    // Menyimpan data user
    const setUser = (newUser: any) => {
        useAuthUser().value = newUser;
        useUserRole().value = newUser?.role || null; 
    };

    // Fungsi Login
    const login = async ({ email, password }: { email: string; password: string }) => {
        try {
            const response: any = await useFetchApi('/api/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            if (!response?.access_token) throw new Error("Login gagal");

            // Set token dan user
            setToken(response.access_token);
            setUser(response?.data?.user);
            isLoggedIn().value = true;

            // Redirect ke halaman sesuai role
            return navigateTo(response?.data?.user?.role === 'Admin' ? '/admin' : '/dashboard');
        } catch (error) {
            console.error(error);
            throw new Error('Email atau kata sandi salah');
        }
    };

    // Fungsi Refresh Token
    const refreshToken = async () => {
        // Mencegah multiple refresh bersamaan
        if (isRefreshing().value) {
            // Tunggu hingga refresh selesai
            let attempts = 0;
            while (isRefreshing().value && attempts < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            return true;
        }
        
        try {
            isRefreshing().value = true;
            const response: any = await $fetch('/api/auth/refresh', { 
                method: 'GET',
                credentials: 'include'
            });
            
            if (response?.access_token) {
                setToken(response.access_token);
                return true;
            } else {
                throw new Error('No access token in response');
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
            await logout(); 
            throw error;
        } finally {
            isRefreshing().value = false;
        }
    };

    // Mengambil Data User
    const getUser = async () => {
        try {
            const token = useAuthToken().value ?? useAuthTokenCookie().value;
            const response: any = await $fetch('/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include'
            });
            setUser(response?.data?.user);
            return true;
        } catch (error) {
            throw error;
        }
    };

    // Memperbarui Token secara Berkala
    const reRefreshAccessToken = () => {
        const authToken = useAuthToken().value;
        if (!authToken) return;

        try {
            const jwt: any = jwtDecode(authToken);
            // jwt.exp adalah dalam detik, kita konversi ke milliseconds
            // Refresh 1 menit sebelum expire
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilRefresh = (jwt.exp - currentTime - 60) * 1000; // 60 detik sebelum expire
            
            console.log(`Token expires at: ${new Date(jwt.exp * 1000).toLocaleString()}`);
            console.log(`Current time: ${new Date().toLocaleString()}`);
            console.log(`Will refresh in: ${Math.round(timeUntilRefresh / 1000)} seconds`);
            
            if (timeUntilRefresh <= 0) {
                // Token sudah expired atau akan expired dalam 1 menit, refresh sekarang
                console.log('Token expired or expiring soon, refreshing now...');
                refreshToken().then(() => reRefreshAccessToken());
                return;
            }

            setTimeout(async () => {
                try {
                    console.log('Auto refreshing token...');
                    await refreshToken();
                    reRefreshAccessToken();
                } catch (error) {
                    console.error('Auto refresh failed:', error);
                }
            }, timeUntilRefresh);
        } catch (error) {
            console.error('Error setting up auto refresh:', error);
        }
    };

    // Inisialisasi Autentikasi saat Aplikasi Dimuat
    const initAuth = async () => {
        try {
            if (!isLoggedIn().value) return;
            await refreshToken();
            await getUser();
            reRefreshAccessToken();
        } catch (error) {
            console.error(error);
        }
    };

    // Logout
    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', { 
                method: 'GET',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Hapus semua data autentikasi
            setToken(null);
            setUser(null);
            useUserRole().value = null;
            isLoggedIn().value = false;
            navigateTo('/auth/login'); 
        }
    };

    return {
        login,
        useAuthUser,
        useAuthToken,
        useAuthTokenCookie,
        useUserRole, 
        initAuth,
        logout,
        refreshToken,
        isLoggedIn
    };
};
