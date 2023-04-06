const Joi = require("@hapi/joi");
const regex = require("../constants/regex");
const constants = require("../constants/constants");

module.exports.userRegistrationValidation = async (data) => {
  console.log("dta", data);
  const userValidationSchema = Joi.object().keys({
    email_id: Joi.string().email().required(),
    username: Joi.string().regex(regex.usernameRegex).required(),
    password: Joi.string().regex(regex.passwordRegex).required(),
    confirm_password: Joi.string().regex(regex.passwordRegex).required(),
    user_type: Joi.string()
      .valid(constants.roles.artist)
      .valid(constants.roles.user)
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    stage_name: Joi.string(),
    session_price: Joi.number().required(),
    session_duration: Joi.number().required(),
  });
  return await userValidationSchema.validate(data);
};
