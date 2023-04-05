const response = require('../controllers/ResponseController');
const constants = require('../constants/constants');
const jobService = require('../services/job-service');
const AppError = require('../config/error');
const jobValidation = require('../validations/jov-validation');

module.exports.postJob = async (req, res, next) => {
    try {
        await jobValidation.postJobValidation(req.body);
        var result = await jobService.postJob(req.body);

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

module.exports.getJob = async (req, res, next) => {
    try {
        var result = await jobService.getJob(req.params.id);

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

module.exports.getAllJob = async (req, res, next) => {
    try {
        var result = await jobService.getAllJob(req.body);

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

module.exports.applyJob = async (req, res, next) => {
    try {
        var result = await jobService.applyJob(req.body, req.user);

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