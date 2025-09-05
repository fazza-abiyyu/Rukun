export default (url: string, options: any = {}) => {
    const { useAuthToken, useAuthTokenCookie, refreshToken, logout } = useAuth()
    
    const makeRequest = async (retryCount = 0): Promise<any> => {
        const token = useAuthToken().value ?? useAuthTokenCookie().value
        
        try {
            return await $fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
                credentials: 'include',
            })
        } catch (error: any) {
            // Jika error 401 dan belum retry, coba refresh token
            if (error?.response?.status === 401 && retryCount === 0 && token) {
                try {
                    await refreshToken()
                    // Retry request dengan token baru
                    return makeRequest(1)
                } catch (refreshError) {
                    // Jika refresh gagal, logout user
                    await logout()
                    throw refreshError
                }
            }
            throw error
        }
    }
    
    return makeRequest()
}