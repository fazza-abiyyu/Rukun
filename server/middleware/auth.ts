import UrlPattern from "url-pattern";
import { decodeAccessToken } from "~/server/utils/jwt";
import { User } from "~/server/model/User";

// Definisikan peran dan izin
const roles = {
    USER: 'User',
    ADMIN: 'Admin'
};

const permissions = {
    [roles.USER]: [],
    [roles.ADMIN]: [
        '/api/auth/user',
        '/api/auth/users',
        '/api/auth/citizen',
        '/api/auth/citizen/:id',
        '/api/auth/citizen/search?q=:q',
        '/api/auth/citizen?page=:page&pagesize=:pagesize',
        '/api/auth/kk',
        '/api/auth/kk/:id',
        '/api/auth/kk/search?q=:q',
        '/api/auth/kk?page=:page&pagesize=:pagesize',
        '/api/auth/cashflow',
        '/api/auth/cashflow/:id',
        '/api/auth/cashflow/search?q=:q',
        '/api/auth/cashflow?page=:page&pagesize=:pagesize',
        '/api/auth/notification',
        '/api/auth/notification/:id',
        '/api/auth/notification/search?q=:q',
        '/api/auth/notification?page=:page&pagesize=:pagesize',
    ]
};

// Definisikan endpoint tanpa proteksi
const unprotectedEndpoints = [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/forget-password',
    '/api/auth/reset-password',
    '/api/auth/refresh',
    '/api/auth/appliction-letter',
    '/api/auth/graph',
    '/api/auth/stats',
    '/'

];

export default defineEventHandler(async (event) => {
    const url = event.req.url as string;

    // Periksa apakah URL berada di folder api/auth
    if (!url.startsWith('server/api/auth')) {
        console.log(`URL ${url} tidak berada di folder api/auth.`);
        return;
    }

    // Periksa apakah endpoint adalah unprotected
    const isUnprotected = unprotectedEndpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint);
        return pattern.match(url);
    });

    if (isUnprotected) {
        console.log(`Endpoint ${url} adalah unprotected.`);
        return;
    }

    try {
        const token = event.req.headers['authorization']?.split(' ')[1];

        // Periksa apakah token ada di daftar hitam
        if (await isBlacklisted(token)) {
            console.log(`Token ${token} ada di daftar hitam.`);
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }));
        }

        const decoded = decodeAccessToken(token as string);

        if (!decoded) {
            console.log(`Token tidak dapat didecode.`);
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }));
        }

        try {
            const userId = decoded.id;
            const user = await User.getUserById(userId);
            event.context.auth = { user: user, role: user.role };

            // Periksa apakah endpoint yang diminta ditangani oleh middleware ini
            const isHandledByThisMiddleware = Object.values(permissions).flat().some(endpoint => {
                const pattern = new UrlPattern(endpoint);
                return pattern.match(url);
            });

            if (!isHandledByThisMiddleware) {
                console.log(`Endpoint ${url} tidak ditangani oleh middleware ini.`);
                return;
            }

            // Periksa apakah pengguna berhak mengakses endpoint
            const userRole = event.context.auth.role;
            const userPermissions = permissions[userRole] || [];
            const isAuthorized = userPermissions.some(endpoint => {
                const pattern = new UrlPattern(endpoint);
                return pattern.match(url);
            });

            if (!isAuthorized) {
                console.log('Terlarang: Pengguna tidak memiliki izin untuk mengakses endpoint ini.');
                return sendError(event, createError({
                    statusCode: 403,
                    statusMessage: 'Forbidden'
                }));
            }
        } catch (error) {
            console.log('Kesalahan saat mengambil pengguna:', error);
            return;
        }
    } catch (e) {
        console.log('Kesalahan saat decode token:', e);
        return;
    }
});