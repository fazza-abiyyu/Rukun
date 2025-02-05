export default (url: string, options: any = {}) => {
    const { useAuthToken, useAuthTokenCookie } = useAuth()
    const token = useAuthToken().value ?? useAuthTokenCookie().value

    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    })
}