const Joi = require('@hapi/joi');
const regex = require('../constants/regex');
const constants = require('../constants/constants');

module.exports.userRegistrationValidation = async (data) => {
    console.log("dta", data);
    const userValidationSchema = Joi.object().keys({
        email_id: Joi.string().email().required(),
        username: Joi.string().regex(regex.usernameRegex).required(),
        password: Joi.string().regex(regex.passwordRegex).required(),
        confirm_password: Joi.string().regex(regex.passwordRegex).required(),
        user_type: Joi.string().valid(constants.roles.recruiter).valid(constants.roles.applicant).required(),

    });
    return await userValidationSchema.validate(data);
}