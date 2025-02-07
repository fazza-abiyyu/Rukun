import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '~/server/utils/jwt';
import { User } from '~/server/model/User';
import roleMiddleware from '~/server/middleware/role';

export default defineEventHandler(async (event) => {
    try {
        const endpoints = [
            { path: '/api/auth/user', roles: ['Admin'] },
            { path: '/api/auth/logs', roles: ['Admin'] },
            { path: '/api/auth/logout', roles: ['User', 'Admin'] },
            { path: '/api/auth/citizen', roles: ['Admin']},
            { path: '/api/auth/citizen/:id', roles: ['Admin']},
            { path: '/api/auth/citizen/search?q=:q', roles: ['Admin']},
            { path: '/api/auth/citizen/page=:page&pagesize=:pagesize', roles: ['Admin']},
            { path: '/api/auth/kk', roles: ['Admin'] },
            { path: '/api/auth/kk/:id', roles: ['Admin']},
            { path: '/api/auth/kk/search?q=:q', roles: ['Admin']},
            { path: '/api/auth/kk/page=:page&pagesize=:pagesize', roles: ['Admin']},
            { path: '/api/auth/cashflow', roles: ['Admin'] },
            { path: '/api/auth/cashflow/:id', roles: ['Admin']},
            { path: '/api/auth/cashflow/search?q=:q', roles: ['Admin']},
            { path: '/api/auth/cashflow/page=:page&pagesize=:pagesize', roles: ['Admin']},
            { path: '/api/auth/notification', roles: ['Admin'] },
            { path: '/api/auth/notification/:id', roles: ['Admin']},
            { path: '/api/auth/notification/search?q=:q', roles: ['Admin']},
            { path: '/api/auth/notification/page=:page&pagesize=:pagesize', roles: ['Admin']},
            { path: '/api/auth/application-letter', roles: ['Admin'] },
            { path: '/api/auth/application-letter/:id', roles: ['Admin']},
            { path: '/api/auth/application-letter/page=:page&pagesize=:pagesize', roles: ['Admin']},
            { path: '/api/auth/user/application-letter', roles: ['Admin'] },
            { path: '/api/auth/user/application-letter/:id', roles: ['Admin']},
            { path: '/api/auth/user/application-letter/page=:page&pagesize=:pagesize', roles: ['Admin']},
        ];

        const matchedEndpoint = endpoints.find((endpoint) => {
            const pattern = new UrlPattern(endpoint.path);
            return pattern.match(event.req.url as string);
        });

        if (!matchedEndpoint) {
            return;
        }

        const token = event.req.headers['authorization']?.split(' ')[1];

        const decoded = decodeAccessToken(token as string);

        if (!decoded) {
            return sendError(
                event,
                createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
                })
            );
        }

        try {
            const userId = decoded.id;
            const user = await User.getUserById(userId);
            event.context.auth = { user: user };

            // Pengecekan role
            await roleMiddleware(matchedEndpoint.roles)(event);
        } catch (error) {
            return;
        }
    } catch (e) {
        return;
    }
});
