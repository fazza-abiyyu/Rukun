import UrlPattern from "url-pattern"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/model/User";

export default defineEventHandler( async (event) => {
    try {
        const endpoints = [
            '/api/auth/user',
            '/api/auth/logs',
            '/api/auth/logout',
            '/api/auth/users',
            '/api/auth/users/:id',
            '/api/auth/users/search?q=:q',
            '/api/auth/users?page=:page&pagesize=:pagesize',
            '/api/auth/logs?page=:page&pagesize=:pagesize',
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
            '/api/auth/notifications',
            '/api/auth/notifications/:id',
            '/api/auth/notifications/search?q=:q',
            '/api/auth/notifications?page=:page&pagesize=:pagesize',
            '/api/auth/application-letter',
            '/api/auth/application-letter/:id',
            '/api/auth/application-letter/search?q=:q',
            '/api/auth/application-letter?page=:page&pagesize=:pagesize',
        ]

        const isHandledByThisMiddleware = endpoints.some(endopoint => {
            const pattern = new UrlPattern(endopoint)
            return pattern.match(event.req.url as string)
        })

        if (!isHandledByThisMiddleware) {
            return
        }

        const token = event.req.headers['authorization']?.split(' ')[1]

        const decoded = decodeAccessToken(token as string)

        if (!decoded) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }))
        }


        try {
            const userId = decoded.id

            const user = await User.getUserById(userId)
            event.context.auth = {user: user}
        } catch (error) {
            return
        }
    } catch (e) {
        return
    }})