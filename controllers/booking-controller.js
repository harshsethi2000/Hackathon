const bookingService = require("../services/booking-service")();

const bookingController = () => {
  const bookController = {
    createBooking: async (req, res) => {
      try {
        const { start_time, user_id, artist_id } = req.body;
        if (!start_time || !user_id || !artist_id) {
          return res.status(500).json({
            message: "Please pass valid parameters",
          });
        }
        const result = await bookingService.createBook(
          start_time,
          user_id,
          artist_id
        );
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    acceptOrRejectBooksByArtist: async (req, res) => {
      try {
        const { book_id, status } = req?.body;
        if (!book_id || !status) {
          return res.status(500).json({
            message: "Please pass valid parameters",
          });
        }
        const result = await bookingService.acceptOrRejectBooking(
          book_id,
          status
        );
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getBooksForArtistAcceptance: async (req, res) => {
      try {
        const artist_id = req?.user?._id?.toString();
        const result = await bookingService.getbookingsForAcceptanceOrRejection(
          artist_id
        );
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getUpcomingBooksForArtist: async (req, res) => {
      try {
        const artist_id = req?.user?._id?.toString();
        const result = await bookingService.getUpcomingBooksOfArtist(artist_id);
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getUpcomingBooksForUser: async (req, res) => {
      try {
        const user_id = req?.user?._id?.toString();
        const result = await bookingService.getUpcomingBooksOfUser(user_id);
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getCompletedBooksForArtist: async (req, res) => {
      try {
        const artist_id = req?.user?._id?.toString();
        const result = await bookingService.getCompletedBooksOfArtist(
          artist_id
        );
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getCompletedBooksOfUser: async (req, res) => {
      try {
        const user_id = req?.user?._id?.toString();
        const result = await bookingService.getCompletedBooksOfUser(user_id);
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
    getdatesForBookings: async (req, res) => {
      try {
        const artist_id = req?.user?._id?.toString();
        const result = await bookingService.getDatesForBooking(artist_id);
        return res.status(200).json({
          message: "success",
          data: result,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
  };
  return bookController;
};

module.exports = bookingController;
