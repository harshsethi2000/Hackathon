const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    description: {
        required: true,
        type: String
    },
    skils: [String],
    experience: {
        to: {
            type: Number,
            required: true,
        },
        from: {
            type: Number,
            required: true,
        }
    }
}, {
    timestamps: true
});


const jobs = mongoose.model("jobs", jobsSchema);
module.exports = jobs;