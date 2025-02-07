export default (requiredRoles: string[]) => {
    return async (event: any) => {
        const user = event.context?.auth?.user;

        if (!user || !requiredRoles.includes(user.role)) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Access denied, insufficient permissions'
            });
        }
    };
};
