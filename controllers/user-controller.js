const response = require('../controllers/ResponseController');
const constants = require('../constants/constants');
const AppError = require('../config/error');
const userValidation = require('../validations/user-validation');
const userService = require('../services/user-service')



module.exports.registration = async (req, res, next) => {
    try {
        await userValidation.userRegistrationValidation(req.body);
        var result = await userService.userRegistration(req.body);

        if (result.status) {
            return response(req, res, result.message, result.data, constants.statuscodes.success);
        }
        else {
            return next(new AppError(result.message, result.statuscode));
        }

    } catch (error) {
        return next(error);
    }
}
module.exports.login = async (req, res, next) => {
    try {
        var result = await userService.login(req.body);
        if (result.status) {
            return response(req, res, result.message, result.data, constants.statuscodes.success, result.token);
        }
        else {
            return next(new AppError(result.message, result.statuscode));
        }
    } catch (error) {
        return next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        var result = await userService.getUserProfile(req.user);
        if (result.status) {
            return response(req, res, result.message, result.data, constants.statuscodes.success);
        } else {
            return next(new AppError(result.message, result.statuscode));
        }
    } catch (error) {
        next(error)
    }
}

