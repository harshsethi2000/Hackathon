const jobApplication = require('../models/job-application');
const jobModel = require('../models/jobs');

const ObjectId = require('mongodb').ObjectID;



module.exports.postJob = async (body) => {
    const job = await jobModel.create(body)
    if (job) {
        return {
            status: true,
            data: job,
            message: "Job is created successfully"
        }

    } else {
        return {
            status: false,
            message: "somthing went wrong"
        }
    }

}

module.exports.getJob = async (id) => {
    const job = await jobModel.findById(ObjectId(id))
    if (job) {
        return {
            status: true,
            data: job,
            message: "Job is fetched successfully"
        }
    } else return {
        status: false,
        message: "Job not found"
    }
}

module.exports.getAllJob = async (data) => {

    let skilsFilter = {}
    let experienceTofilter = {}
    let experienceFromfilter = {}
    const limit = parseInt(data.size) || 10
    const page = parseInt(data.page) || 1
    if (data.skils) {
        skilsFilter = { skils: { $in: data.skils } }
    }
    if (parseInt(data.experience?.to)) {
        experienceTofilter = { "experience.to": { $gte: parseInt(data.experience?.to) } }
    }
    if (parseInt(data.experience?.from)) {
        experienceFromfilter = { "experience.from": { $lte: parseInt(data.experience?.from) } }
    }
    const filterObj = {
        $and: [
            skilsFilter,
            {
                $or: [experienceTofilter, experienceFromfilter]
            }
        ]
    }

    console.log(JSON.stringify(filterObj))

    const job = await jobModel.find(filterObj).skip((page - 1) * limit).limit(limit)
    if (job) {
        return {
            status: true,
            data: job,
            message: "Job is fetched successfully"
        }
    } else return {
        status: false,
        message: "Job not found"
    }
}


module.exports.applyJob = async (body, user) => {
    if (body?.job_id) {
        const obj = {
            job_id: body.job_id,
            applicant_id: user.id
        }
        const job = await jobApplication.create(obj)
        if (job) {
            return {
                status: true,
                data: job,
                message: "Applied successfully"
            }
        } else return {
            status: false,
            message: "Something went wrong"
        }
    } else {
        return {
            status: false,
            message: "Something went wrong"
        }
    }

}