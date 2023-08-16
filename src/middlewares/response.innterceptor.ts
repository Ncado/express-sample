export function modifyResponse(req, res, next) {
    const originalJson = res.json;

    res.json = (data) => {
        if (res.statusCode >= 400 && res.statusCode < 600) {
            let newResponse;


            newResponse = {
                status: 0,
                error: {
                    fields: data.fields,
                    code: data.code,
                },
            };

            originalJson.call(res, newResponse);

        } else {
            const newResponse = {
                data: data.data,
                meta: data.meta,
                token: data.token,
                status: 1,
            };

            // Call the original res.json method with the modified response
            originalJson.call(res, newResponse);
        }
        // Create the new response format

    };
    next();
}