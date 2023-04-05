const AppError = require('../config/error');
const authService = require('../services/auth-service');
const constants = require('../constants/constants');



module.exports.authorizeToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    //const token=authHeader &&  authHeader.split(' ')[1];
    if (token == null) {
        return next(new AppError("Token is invalid or expired", constants.statuscodes.unauthorized));
    }

    var result = await authService.verifyToken(token);
    if (result.status == true) {
        req.user = result.data;
        return next();
    }
    else {
        return next(new AppError(result.message, result.statuscode));
    }

}

module.exports.restrictTo = (...user) => {
    const errorMessage = "You do not havbe permission to perform this action";
    try {
        return (req, res, next) => {
            if (!user.includes(req.user.user_type)) {
                return next(new AppError(errmsg, constants.statuscodes.forbidden));
            }
            next();
        }
    } catch (error) {
        return next(error);
    }
}