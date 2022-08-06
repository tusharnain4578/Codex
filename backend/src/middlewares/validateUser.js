const Joi = require('joi'); //for validation

module.exports = (req, res, next) => {

    //schema for registration
    const registerSchema = Joi.object().keys({
        name: Joi.string().min(2).max(30).required().label("Name").messages({
            'string.min': `"Name" should have a minimum length of {#limit}`,
            'string.max': `"Name" should have a maximum length of {#limit}`,
        }),
        email: Joi.string().required().label("Email"),
        password: Joi.string().min(8).max(20).required().label("Password").messages({
            'string.min': `"Password" should have a minimum length of {#limit}`,
            'string.max': `"Password" should have a maximum length of {#limit}`,
        }),
        cpassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').options({
            messages: { 'any.only': `"Passwords" does not match` }
        })
    });

    //schema for login
    const loginSchema = Joi.object().keys({
        email: Joi.string().required().label("Email"),
        password: Joi.string().min(8).max(20).required().label("Password").messages({
            'string.min': `"Password" should have a minimum length of {#limit}`,
            'string.max': `"Password" should have a maximum length of {#limit}`,
        })
    });

    let result;

    const requestRoute = req.originalUrl;

    switch (requestRoute) {
        //if validation called for registration
        case "/user/register":
            result = registerSchema.validate(req.body, { abortEarly: false });
            break;

        //if validation called for login
        case "/user/login":
            result = loginSchema.validate(req.body);
            break;

        default: break;
    }

    if (result.error) {
        //status  code 400 -> Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error
        res.status(400).send({ message: result.error.details[0].message });
        return;
    }
    next();
}; 