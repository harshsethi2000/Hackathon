const bookingModels = require("../models/bookings");
const artistModel = require("../models/users");

const bookingService = () => {
  const service = {
    createBook: async (start_time_epoch, user_id, artist_id) => {
      try {
        const artist = await artistModel
          .findOne({ _id: artist_id })
          .lean()
          .exec();
        const end_time_epoch =
          start_time_epoch + artist?.session_duration * 60 * 1000;
        const booking = new bookingModels();
        booking.start_time_epoch = start_time_epoch;
        booking.end_time = end_time_epoch;
        booking.user_id = user_id;
        booking.artist_id = artist_id;
        booking.status = "BLOCKED";

        const response = await booking.save();
        return response;
      } catch (err) {
        console.error(e);
        throw e;
      }
    },
    acceptOrRejectBooking: async (bookId, status) => {
      try {
        const book = await bookingModels
          .findOneAndUpdate({ _id: bookId }, { status: status })
          .lean()
          .exec();
        return book;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getbookingsForAcceptanceOrRejection: async (artist_id) => {
      try {
        const bookings = await bookingModels
          .find({
            artist_id: artist_id,
            start_time_epoch: { $gt: new Date().getTime() + 24 * 3600 * 1000 },
            status: "BLOCKED",
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
          .sort({ start_time_epoch: -1 })
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
          .sort({ start_time_epoch: -1 })
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
          .findOne({ artist_id: artist_id })
          .lean()
          .exec();
        const duration = artist?.session_duration;
        const noOfSlots = Math.ceil(
          (start_date - end_date) / (duration * 60 * 1000)
        );
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
        dates = dates.filter((entry) => !toRemove.includes(entry));
        return dates;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
  return service;
};

module.exports = bookingService;
