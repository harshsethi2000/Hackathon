const bookingService = require("../services/booking-service")();

const bookingController = () => {
  const bookController = {
    createBooking: async (req, res) => {
      try {
        const user_id = req?.user?.id?.toString();
        const { start_time, artist_id, event_id, amount } = req.body;
        if (!start_time || !user_id || !artist_id || !amount) {
          return res.status(500).json({
            message: "Please pass valid parameters",
          });
        }
        const result = await bookingService.createBook(
          start_time,
          user_id,
          artist_id,
          event_id ?? null,
          amount
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
        const artist_id = req?.user?.id?.toString();
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
        const artist_id = req?.user?.id?.toString();
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
        const user_id = req?.user?.id?.toString();
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
        const artist_id = req?.user?.id?.toString();
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
        const user_id = req?.user?.id?.toString();
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
        const artist_id = req?.user?.id?.toString();
        const { start_time, end_time } = req?.body;
        if (!start_time || !end_time) {
          return res.status(500).json({
            message: "Please pass valid parameters",
          });
        }
        const result = await bookingService.getDatesForBooking(
          artist_id,
          start_time,
          end_time
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
    verifyPayment: async (req, res) => {
      try {
        const { booking_id } = req?.body;
        const result = await bookingService.verifyPayment(booking_id);
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
    fetchTransaction: async (req, res) => {
      try {
        console.log("REQ>USER " + JSON.stringify(req?.user));
        const user_id = req?.user?.id?.toString();
        let userData = await bookingService.getUserDataById(user_id);
        if(!userData) {
          console.log("No User data found for user_id " + user_id);
          throw new Error("No User data found for user_id " + user_id);
        }
        let isArtist = false;
        console.log("userData?.user_type " + userData?.user_type);
        if(userData?.user_type === "Artist")
          isArtist = true;
        let data = await bookingService.getTransactionsByUserId(user_id, isArtist);
        return res.status(200).json({
          message: "success",
          data: data,
        })
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    },
  };
  return bookController;
};

module.exports = bookingController;
