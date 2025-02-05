import {jwtDecode} from "jwt-decode"

export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthTokenCookie = () => useCookie('access_token')
    const useAuthUser = () => useState('auth_user')
    const isLoggedIn = () => useCookie('isLoggedIn')


    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken()
        authToken.value = newToken
        const authTokenCookie = useAuthTokenCookie()
        authTokenCookie.value = newToken
    }

    const setUser = (newUser: string | null) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const login = ({email, password}: { email: string, password: string }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi('/api/auth/login', {
                    method: 'POST',
                    body: {
                        email: email,
                        password: password,
                    }
                })

                setToken(response?.access_token)
                setUser(response?.data?.user)
                isLoggedIn().value = String(true)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi('/api/auth/refresh', {
                    method: 'GET',
                })
                setToken(response?.access_token)
                resolve(true)
            } catch (error) {
                await logout();
                reject(error)
            }
        })
    }

    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi('/api/auth/user')

                setUser(response?.data?.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken().value

        if (!authToken) {
            return
        }

        const jwt: any = jwtDecode(authToken as string)

        const newRefreshTime = jwt?.exp - 60000

        setTimeout(async () => {
            await refreshToken()
            reRefreshAccessToken()
        }, newRefreshTime);
    }

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!isLoggedIn().value) return
                await refreshToken()
                await getUser()
                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                // setIsAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi('/api/auth/logout', {
                    method: 'GET'
                })

                setToken(null)
                setUser(null)
                isLoggedIn().value = String(false)
                resolve(true)
            } catch (error) {
                isLoggedIn().value = String(false)
                reject(error)
            }
        })
    }

    return {
        login,
        useAuthUser,
        useAuthToken,
        useAuthTokenCookie,
        initAuth,
        logout,
        isLoggedIn
    }
}