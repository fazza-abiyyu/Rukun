import UrlPattern from "url-pattern"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/model/User";

export default defineEventHandler( async (event) => {
    try {
        const endpoints = [
            '/api/auth/user',
            '/api/auth/logs',
            '/api/auth/logout',
            '/api/auth/user',
            '/api/auth/profile',
            '/api/auth/quiz',
            '/api/auth/quiz/:id',
            '/api/auth/quiz?page=:page&pagesize=:pagesize',
            '/api/auth/quiz-questions',
            '/api/auth/quiz-questions/:id',
            '/api/auth/quiz-questions?page=:page&pagesize=:pagesize',
            '/api/auth/user-quiz-results',
            '/api/auth/user-quiz-results/:id',
            '/api/auth/user-quiz-results?page=:page&pageSize=:pagesize',
            '/api/auth/stats',
            '/api/auth/graph?year=:year',
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