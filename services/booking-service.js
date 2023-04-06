const bookingModels = require("../models/bookings");
const artistModel = require("../models/users");
const transactionModel = require("../models/transactions");
const nanoid = require("nanoid");
async function getUserDataById(userId) {
  console.log("USer Id " + userId);
  let artistData = await artistModel.findOne({ _id: userId }).lean();
  return artistData;
}
const bookingService = () => {
  const createTransaction = async (reqBody) => {
    try {
      const { amount, artist_id, user_id, booking_id, event_id } = reqBody;
      const transaction = new transactionModel();
      transaction.amount = amount;
      transaction.artist_id = artist_id;
      transaction.user_id = user_id;
      transaction.booking_id = booking_id;
      if (event_id) {
        transaction.event_id = event_id;
      }
      transaction.status = "initiated";
      transaction.currency = "INR";
      transaction.order_id = nanoid.customAlphabet(
        "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ",
        20
      )();
      const response = await transaction.save();
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const service = {
    createBook: async (
      start_time_epoch,
      user_id,
      artist_id,
      event_id,
      amount
    ) => {
      try {
        const artist = await artistModel
          .findOne({ _id: artist_id })
          .lean()
          .exec();

        const book = await bookingModels
          .findOne({
            artist_id: artist_id,
            start_time_epoch: start_time_epoch,
          })
          .lean()
          .exec();
        if (book) {
          return "This slot is allready booked";
        }
        const end_time_epoch =
          start_time_epoch + artist?.session_duration * 60 * 1000;
        const booking = new bookingModels();
        booking.start_time_epoch = start_time_epoch;
        booking.end_time_epoch = end_time_epoch;
        booking.user_id = user_id;
        booking.artist_id = artist_id;
        booking.status = "BLOCKED";
        if (event_id) {
          booking.event_id = event_id;
        }
        const transactionBody = {
          amount: amount,
          artist_id: artist_id,
          user_id: user_id,
          event_id: event_id,
        };
        const transaction = await createTransaction(transactionBody);
        booking.transaction_id = transaction?._id?.toString();
        const response = await booking.save();

        return { response, transaction };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    acceptOrRejectBooking: async (bookId, status) => {
      try {
        let book;
        if (status === "CANCELED") {
          await transactionModel
            .findOneAndUpdate(
              { _id: book?.transaction_id },
              { status: "refunded" },
              { new: true }
            )
            .lean()
            .exec();
          book = await bookingModels
            .findOneAndUpdate(
              { _id: bookId },
              { status: status, payment_status: "refunded" },
              { new: true }
            )
            .lean()
            .exec();
        } else {
          book = await bookingModels
            .findOneAndUpdate(
              { _id: bookId, status: "BLOCKED" },
              { status: status },
              { new: true }
            )
            .lean()
            .exec();
          const transaction = await transactionModel
            .findOne({ _id: book?.transaction_id })
            .lean()
            .exec();
          await artistModel.findOneAndUpdate(
            { _id: book?.artist_id },
            {
              $inc: {
                booking_count: 1,
                "earnings.daily_booking": transaction?.amount,
                "earnings.total": transaction?.amount,
              },
            }
          );
        }
        return book;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getbookingsForAcceptanceOrRejection: async (artist_id) => {
      try {
        console.log(artist_id);
        const bookings = await bookingModels
          .find({
            artist_id: artist_id,
            start_time_epoch: { $gt: new Date().getTime() + 24 * 3600 * 1000 },
            status: "BLOCKED",
            payment_status: "success",
          })
          .sort({ start_time_epoch: -1 })
          .lean()
          .exec();
        return bookings;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getUpcomingBooksOfArtist: async (artist_id) => {
      try {
        const bookings = await bookingModels
          .find({
            artist_id: artist_id,
            start_time_epoch: { $gt: new Date().getTime() + 24 * 3600 * 1000 },
            status: "CONFIRMED",
          })
          .sort({ start_time_epoch: -1 })
          .lean()
          .exec();
        for (let booking of bookings) {
          let userId = booking?.user_id;
          let userData = await getUserDataById(userId);
          if (!userData) continue;
          booking.user_data = userData;
        }
        return bookings;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getUpcomingBooksOfUser: async (user_id) => {
      try {
        const bookings = await bookingModels
          .find({
            user_id: user_id,
            start_time_epoch: { $gt: new Date().getTime() + 24 * 3600 * 1000 },
            status: "CONFIRMED",
          })
          .sort({ start_time_epoch: -1 })
          .lean()
          .exec();
        for (let booking of bookings) {
          let artist_id = booking?.artist_id;
          let artistData = await getUserDataById(artist_id);
          booking.artist_data = artistData;
        }
        return bookings;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getCompletedBooksOfUser: async (user_id) => {
      try {
        const bookings = await bookingModels
          .find({
            user_id: user_id,
            start_time_epoch: { $lt: new Date().getTime() },
            status: "CONFIRMED",
          })
          .sort({ start_time_epoch: 1 })
          .lean()
          .exec();
        return bookings;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getCompletedBooksOfArtist: async (artist_id) => {
      try {
        const bookings = await bookingModels
          .find({
            artist_id: artist_id,
            start_time_epoch: { $lt: new Date().getTime() },
            status: "CONFIRMED",
          })
          .sort({ start_time_epoch: 1 })
          .lean()
          .exec();
        return bookings;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getDatesForBooking: async (artist_id, start_date, end_date) => {
      try {
        const artist = await artistModel
          .findOne({ _id: artist_id })
          .lean()
          .exec();
        const duration = artist?.session_duration;
        const noOfSlots = Math.ceil(
          (end_date - start_date) / (duration * 60 * 1000)
        );
        console.log(noOfSlots);
        let dates = [];
        let nextStart = start_date;
        dates.push(nextStart);

        for (i = 0; i < noOfSlots; i++) {
          nextStart += nextStart + duration * 60 * 1000;
          dates.push(nextStart);
        }
        const bookinsDoneForArtist = await bookingModels
          .find({
            artist_id: artist_id,
            status: { $in: ["CONFIRMED", "BLOCKED"] },
          })
          .lean()
          .exec();
        const toRemove = [];
        for (let i = 0; i < bookinsDoneForArtist.length; i++) {
          toRemove.push(bookinsDoneForArtist[i].start_time_epoch);
        }
        console.log(toRemove);
        dates = dates.filter((entry) => !toRemove.includes(entry));
        return dates;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    verifyPayment: async (booking_id) => {
      try {
        const booking = await bookingModels.findOne({ _id: booking_id });
        const transaction = transactionModel
          .findOneAndUpdate(
            { _id: booking?.transaction_id },
            { status: "success", booking_id: booking_id },
            { new: true }
          )
          .lean()
          .exec();
        const updateBook = await bookingModels
          .findOneAndUpdate(
            { _id: booking_id },
            { payment_status: "success" },
            { new: true }
          )
          .lean()
          .exec();
        if (updateBook?.event_id) {
          await artistModel.findOneAndUpdate(
            { _id: updateBook?.artist_id },
            {
              $inc: {
                booking_count: 1,
                "earnings.events": transaction?.amount,
                "earnings.total": transaction?.amount,
              },
            }
          );
        }
        return transaction;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getTransactionsByUserId: async (userId, isArtist) => {
      try {
        let query;
        if (isArtist)
          query = {
            artist_id: userId,
          };
        else
          query = {
            user_id : userId
          }
        let txnData = await transactionModel.find(query).lean().sort({start_time : -1});
        if(!txnData)
          return [];
        for(let txn of txnData) {
          let booking_id = txn?.booking_id;
          let bookingData = bookingModels.findOne({_id: booking_id}).lean();
          txn.booking_data = bookingData;
          let userData = getUserDataById(userId);
          txn.user_data = userData;
        }
        return txnData;
      } catch (e) {
        throw e;
      }
    },
    getUserDataById: async (userId) => {
      console.log("USer Id " + userId);
      let artistData = await artistModel.findOne({ _id: userId }).lean();
      return artistData;
    },
  };
  return service;
};

module.exports = bookingService;
