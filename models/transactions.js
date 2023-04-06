const mongoose = require("mongoose");
const paymentStatus = ["initiated", "success", "failed", "refunded"];

const transactionSchema = new mongoose.Schema({
  amount: Number,
  artist_id: String,
  user_id: String,
  booking_id: String,
  event_id: String,
  currency: String,
  order_id: String,
  status: { type: String, enum: paymentStatus },
});

module.exports = new mongoose.model(
  "transaction",
  transactionSchema,
  "transaction"
);
