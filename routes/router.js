const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const constants = require("../constants/constants");
const authController = require("../controllers/AuthController");
const jobController = require("../controllers/job-controllers");
const bookingController = require("../controllers/booking-controller")();

router.get("/", (req, res) => {
  res.send("{message:'Welcome to my site'}");
});
router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.use(authController.authorizeToken); //

router.get("/user-profile", userController.getUserProfile);
router.post(
  "/post-job",
  authController.restrictTo(constants.roles.recruiter),
  jobController.postJob
);
router.get("/job/:id", jobController.getJob);
router.post("/all-job", jobController.getAllJob);
router.post("/book", bookingController.createBooking);
router.post(
  "/book/accept_or_reject",
  bookingController.acceptOrRejectBooksByArtist
);
router.get("/blockedbooks", bookingController.getBooksForArtistAcceptance);
router.get(
  "/artist/upcoming_books",
  bookingController.getUpcomingBooksForArtist
);
router.get("/user/upcoming_books", bookingController.getUpcomingBooksForUser);
router.get(
  "/artist/completed_books",
  bookingController.getCompletedBooksForArtist
);
router.get("/user/completed_books", bookingController.getCompletedBooksOfUser);
router.get("/dates", bookingController.getdatesForBookings);
//router.post('/apply', restrictTo(constants.roles.applicant), jobController.applyJob)

module.exports = router;
