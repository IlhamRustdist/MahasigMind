export const validate = (schema) => (req, res, next) => {
    try {
        // Simple validation wrapper if using Zod or Joi
        // For now, let's assume schema is a Zod schema
        if (schema) {
            schema.parse(req.body);
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: error.errors?.[0]?.message || error.message,
                details: error.errors
            }
        });
    }
};
