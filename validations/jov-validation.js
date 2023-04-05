const Joi = require('@hapi/joi');
const regex = require('../constants/regex');
const constants = require('../constants/constants');

module.exports.postJobValidation = async (data) => {
    const postJobValidationSchema = Joi.object().keys({
        email_id: Joi.string().email().required(),
        title: Joi.string().required(),
        description: Joi.string(),
        skils: Joi.array(),
        experience: Joi.object().keys({
            to: Joi.string().required(),
            from: Joi.string().required(),
        })
    });
    return await postJobValidationSchema.validate(data);
}