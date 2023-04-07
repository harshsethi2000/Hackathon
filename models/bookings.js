let mongoose = require("mongoose");
const nanoid = require("nanoid");
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
    booking_otp: {
      type: String,
      default: nanoid.customAlphabet("1234567890", 6)(),
    },
    room_id: String,
    room_code: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("booking", booking, "booking");
