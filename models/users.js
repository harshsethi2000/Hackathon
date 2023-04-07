const mongoose = require("mongoose");
const constants = require("../constants/constants");
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = new mongoose.Schema(
  {
    youtube_link : {type : String, default : "https://www.youtube.com/watch?v=qAQYE2_IRnw"},
    cover_pic : {type : String, default : "https://i.ytimg.com/vi/oZ62kGkkwrM/mqdefault.jpg"},
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    user_type: {
      type: String,
      required: true,
      enum: [constants.roles],
    },
    first_name: String,
    last_name: String,
    stage_name: String, //in artist only
    session_price: Number,
    session_duration: Number, // in mins only
    earnings: {
      events: Number,
      daily_booking: Number,
      total: Number,
    },
      rating : Number,
      view_count : Number,
      otp : {type : String, default: "123456"},
    booking_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

usersSchema.plugin(uniqueValidator, {
  message: "Error: expected {PATH} to be unique.",
});

const users = mongoose.model("users", usersSchema);
module.exports = users;
