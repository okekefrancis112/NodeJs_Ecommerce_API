// Not Found

const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error Handler

const errorHandler = (req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.join({
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { errorHandler, notFound}