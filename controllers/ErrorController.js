const AppError = require('../config/error');
const statuscodes = require('../constants/constants').statuscodes;
//const winston = require('../config/winston');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}.`
    return new AppError(message, statuscodes.badRequest);
}

//Handling Duplicate fields while updating
const handleDuplicateFieldsDB = err => {
    let value;
    if (err.msg) {
        value = err.errmsg //.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    } else {
        value = err.message
    }
    const message = `${value}. Please use another value!`;
    return new AppError(message, statuscodes.conflict);
}

//Handles Mongoose unique error
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data: ${errors.join(' ')}`;
    return new AppError(message, statuscodes.conflict);
}

const handleJWTError = () => {
    const message = 'Invalid token! Please login again';
    return new AppError(message, statuscodes.unauthorized);
}

const handleJWTExpiredError = () => {
    const message = 'Your token has expired! Please login again.';
    return new AppError(message, statuscodes.unauthorized);
}

const handleJoiError = (err) => {
    for (details in err.details) {
        if (err.details[details].type == 'object.allowUnknown') {
            return new AppError(err.details[details].message, statuscodes.badRequest)
        } else if (err.details[details].type == 'any.required') {
            return new AppError(err.details[details].message, statuscodes.badRequest)
        } else if (err.details[details].type == 'any.empty') {
            return new AppError(err.details[details].message, statuscodes.badRequest)
        } else if (err.details[details].type == 'string.min') {
            return new AppError(err.details[details].message, statuscodes.invalid)
        } else if (err.details[details].type == 'string.max') {
            return new AppError(err.details[details].message, statuscodes.invalid)
        } else if (err.details[details].type == 'string.regex.base') {
            return new AppError(err.details[details].message, statuscodes.invalid)
        } else {
            return new AppError(err.details[details].message, statuscodes.invalid)
        }
    }
}

//Handle Swagger Error
const handleSwaggerError = err => {
    const errmsg = err.message;
    const message = `Swagger Syntax Error: ${errmsg}`;
    return new AppError(message, statuscodes.badRequest);
}

module.exports = (err, req, res, next) => {
    console.log(err)
    err.statusCode = err.statusCode || statuscodes.internal;
    err.status = err.status || 'Error';
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.codeName === 'DuplicateKey') err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') {
        if (err.isJoi) {
            err = handleJoiError(err);
        } else {
            err = handleValidationErrorDB(err);
        }
    }
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    if (err.type === 'entity.parse.failed') err = handleSwaggerError(err);

    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    }
    else {

        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    }
};