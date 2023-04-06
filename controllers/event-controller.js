const bookingService = require("../services/booking-service")();
const Event = require("../models/events");
const eventController = () => {
    async function createEventInSystem(body, artist_id) {
        let event = new Event();
        event.event_type = body?.event_type;
        event.artist_id = artist_id;
        event.start_time = body?.start_time;
        event.end_time = body?.end_time;
        event.duration = body?.duration;
        event.fees = body?.fees;
        const response = await event.save();
        return response;
    }
    async function getFutureEventForArtist(artist_id) {
        let currentTime = Date.now();
        let eventData = Event.find({
            start_time : {$gt : currentTime}
        }).lean();
        if(!eventData || eventData?.length === 0)
            return [];
        return eventData;
    }
    return  {
        createEvent: async (req, res) => {
            try {
                const artist_id = req?.user?._id?.toString();
                const { event_type, start_time, end_time, fees, duration } = req.body;

                if (!event_type || !start_time || !end_time || !fees || !duration) {
                    return res.status(500).json({
                        message: "Please pass valid parameters",
                    });
                }
                const result = await createEventInSystem(req.body, artist_id);
                return res.status(200).json({
                    message: "success",
                    data: result,
                });
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
        fetchEvent : async (req, res) => {
            try {
                const user_id = req?.user?._id?.toString();
                const  artist_id  = user_id;
                let data = await getFutureEventForArtist(artist_id);
                return res.status(200).json({
                    message: "success",
                    data: data,
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
};

module.exports = eventController;
