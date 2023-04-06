let mongoose = require("mongoose");
let  eventObj= [
    "Webinars",
    "Courses",
];
let event = new mongoose.Schema(
    {
        event_name : String,
        event_type : { type: String, enum: eventObj },
        artist_id : String,
        start_time : Number,
        end_time : Number,
        fees : Number,
        duration : Number,//in mins
    },
    { timestamps: true }
);
module.exports = mongoose.model("event", event, "event");
