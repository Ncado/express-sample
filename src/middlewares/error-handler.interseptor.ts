export function modifyErrorResponse(req, res, next) {
    const originalJson = res.json;
    const originalStatus = res.status;

    res.json = (data) => {
        // Check if the status code is an error (4xx or 5xx)
        if (res.statusCode >= 400 && res.statusCode < 600) {
            // Create the new error response format
            const newResponse = {
                error: {
                    message: data.message || "An error occurred",
                    code: res.statusCode,
                },
                status: 0,
            };
            originalJson.call(res, newResponse);
        } else {
            // Call the original res.json method for non-error responses
            originalJson.call(res, data);
        }
    };

    res.status = (statusCode) => {
        res.statusCode = statusCode;
        return originalStatus.call(res, statusCode);
    };

    next();
}

// Add the middleware to the Express app

// Now, whenever you use res.json() with an error status code in your routes, the response will be formatted as you specified.
