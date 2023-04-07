const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const constants = require("../constants/constants");
const authService = require("../services/auth-service");

module.exports.userRegistration = async (body) => {
  var user = await userModel.findOne({
    email_id: body.email_id,
    user_type: constants.roles.admin,
  });
  if (user) {
    return {
      status: false,
      statuscode: constants.statuscodes.conflict,
      message: "This email ID already has an admin account",
    };
  }
  user = await userModel.findOne({ username: body.username });
  if (user) {
    return {
      status: false,
      statuscode: constants.statuscodes.conflict,
      message: "This username already exists",
    };
  }

  if (body.password != body.confirm_password) {
    return {
      status: false,
      statuscode: constants.statuscodes.invalid,
      message: "password does not match",
    };
  }

  // var orgObject = {
  //     name: body.org_name,
  //     address: body.org_address,
  //     establishment_year: body.establishment_year
  // }
  // const org = await organizationModel.create(orgObject);

  //const salt=await bcrypt.genSalt();  //default arg is 10

  const hashedPassword = await bcrypt.hash(body.password, 10);
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let rating = randomInteger(3, 5);
  let view_count = randomInteger(10000,500000);
  var userObject = {
    username: body.username,
    email_id: body.email_id,
    user_type: body.user_type,
    password: hashedPassword,
    first_name: body.first_name,
    last_name: body.last_name,
    stage_name: body?.stage_name,
    session_price: body?.session_price,
    session_duration: body?.session_duration,
    rating : rating,
    view_count : view_count,
  };
  user = await userModel.create(userObject);

  return {
    status: true,
    data: user,
    message: "User is created successfully",
  };
};

module.exports.login = async (data) => {
  var user = null;
  var token;
  var result;
  if (data.email_id != undefined) {
    user = await userModel.findOne({ email_id: data.email_id });
  } else if (data.username != undefined) {
    user = await userModel.findOne({ username: data.username });
  }
  if (user) {
    var password = user.password;
    var matched = await bcrypt.compare(data.password, password);
    if (matched) {
      token = await authService.generateToken({
        id: user._id,
        user_type: user.user_type,
      });
      return {
        status: true,
        data: user,
        token: token,
        message: "Logged in successfully",
      };
    } else {
      return {
        status: false,
        statuscode: constants.statuscodes.invalid,
        message: "Invalid username or password",
      };
    }
  } else {
    return {
      status: false,
      statuscode: constants.statuscodes.invalid,
      message: "Invalid username or password",
    };
  }
};

module.exports.getUserProfile = async (user) => {
  const profile = await userModel.find({ _id: user.id });
  // if (user.user_type == constants.roles.student) {
  //     profile = await studentModel.findOne({ user_id: user.id });
  // }
  // else if (user.user_type == constants.roles.teacher) {
  //     profile = await teacherModel.findOne({ user_id: user.id });
  // }
  if (profile) {
    return {
      status: true,
      data: profile,
      message: "user information fetched successfully",
    };
  } else
    return {
      status: false,
      statuscode: constants.statuscodes.notFound,
      message: "User not found",
    };
};
