export const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
            time: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            durationMs: duration,
            userId: req.user ? req.user.id : undefined
        };

        // Only log if not in production or if it's an error/important event
        if (process.env.NODE_ENV !== 'production' || res.statusCode >= 400) {
            console.log(JSON.stringify(log));
        }
    });
    next();
};
