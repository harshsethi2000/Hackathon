let mongoose = require("mongoose");
let status = [
  "AVAILABLE",
  "CONFIRMED",
  "CHECKED_IN",
  "CANCELED",
  "ABANDONED",
  "BLOCKED",
];
let booking = new mongoose.Schema(
  {
    start_time_epoch: { type: Number, index: true },
    end_time_epoch: { type: Number, index: true },
    user_id: { type: String, index: true },
    artist_id: { type: String, index: true },
    status: { type: String, enum: status },
    transaction_id: String,
    meet_id: String,
    event_id: String,
    payment_status: String,
    booking_otp: { type: String, default: "123456" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("booking", booking, "booking");
