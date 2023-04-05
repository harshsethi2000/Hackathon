module.exports = (req, res, message, data, statuscode = 200, token = undefined) => {
    res.status(statuscode).json({
        data,
        message: message,
        token: token
    });
}