export function modifyResponse(req, res, next) {
    const originalJson = res.json;
    res.json = (data) => {
        // Create the new response format
        const newResponse = {
            data: data.data,
            meta: data.meta,
            token: data.token,
            status: 1,
        };

        // Call the original res.json method with the modified response
        originalJson.call(res, newResponse);
    };
    next();
}