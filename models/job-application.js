const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true,
    },
    applicant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true
});


const jobApplication = mongoose.model("jobApplication", jobApplicationSchema);
module.exports = jobApplication;