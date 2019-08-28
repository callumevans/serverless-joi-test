const { applyRequest } = require('../validation/apply-request');

exports.handler = (event, context, callback) => {
    const request = event.body;
    const validation = applyRequest.validate(request);

    if (validation.error) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ errors: validation.error.details }),
        });

        return;
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(validation.value),
    });
};
