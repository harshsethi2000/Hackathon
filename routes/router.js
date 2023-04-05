const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const constants = require('../constants/constants');
const authController = require('../controllers/AuthController')
const jobController = require('../controllers/job-controllers')



router.get('/', (req, res) => {
    res.send("{message:'Welcome to my site'}");
});
router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.use(authController.authorizeToken);//

router.get('/user-profile', userController.getUserProfile);
router.post('/post-job', authController.restrictTo(constants.roles.recruiter), jobController.postJob)
router.get('/job/:id', jobController.getJob)
router.post('/all-job', jobController.getAllJob)
//router.post('/apply', restrictTo(constants.roles.applicant), jobController.applyJob)


module.exports = router;