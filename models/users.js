const mongoose = require('mongoose');
const constants = require('../constants/constants');
const uniqueValidator = require('mongoose-unique-validator');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    user_type: {
        type: String,
        required: true,
        enum: [constants.recruiter]
    },
}, {
    timestamps: true
});

usersSchema.plugin(uniqueValidator, {
    message: 'Error: expected {PATH} to be unique.',
})


const users = mongoose.model("users", usersSchema);
module.exports = users;