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
  },
  { timestamps: true }
);
module.exports = mongoose.model("booking", booking, "booking");
