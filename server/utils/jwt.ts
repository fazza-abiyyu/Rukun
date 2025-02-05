import jwt from 'jsonwebtoken';

const generateRefreshToken = (payload: any) => {
    const config = useRuntimeConfig();
    console.log(config.JWT_REFRESH_TOKEN);
    return jwt.sign(payload, config.JWT_REFRESH_TOKEN as string, {
        expiresIn: '4h',
    });
};

export const generateAccessToken = (payload: any) => {
    const config = useRuntimeConfig();
    return jwt.sign(payload, config.JWT_ACCESS_TOKEN as string, {
        expiresIn: '10m',
    });
};

export const generateToken = (payload: any) => {
    const refreshToken = generateRefreshToken(payload);
    const accessToken = generateAccessToken(payload);

    return { refreshToken, accessToken };
};

export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig();
    try {
        return jwt.verify(token, config.JWT_ACCESS_TOKEN as string) as any;
    } catch (e) {
        return false;
    }
};

export const verifyToken = (token: string) => {
    const config = useRuntimeConfig();
    try {
        return jwt.verify(token, config.JWT_ACCESS_TOKEN as string) as any;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const decodeRefreshToken = (token: string) => {
    const config = useRuntimeConfig();
    try {
        return jwt.verify(token, config.JWT_REFRESH_TOKEN as string) as any;
    } catch (e) {
        return false;
    }
};

export const sendRefreshToken = (event: any, token: string) => {
    setCookie(event, 'refresh_token', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
    });
};

export const deleteRefreshToken = (event: any) => {
    deleteCookie(event, 'refresh_token');
};