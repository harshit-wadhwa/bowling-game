const Validator = require('validatorjs');

const validate = (schema, property) => {
     return (req, res, next) => {
        const validation = new Validator(req[property], schema);
        if (validation.fails()) {
            res.json({
                error: validation.errors.errors,
                ok: false
            });
        } else {
            next();
        }
    }
};

module.exports = validate;