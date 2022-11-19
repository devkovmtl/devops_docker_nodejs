const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }
    const userExist = await User.findOne({ username }).lean().exec();
    if (userExist) {
      return res.status(409).json({
        success: false,
        msg: "User already exist",
        data: null,
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      msg: "User created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server error",
      data: null,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }
    const user = await User.findOne({ username }).lean().exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
        data: null,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
        data: null,
      });
    }

    const { password: pwd, __v, ...others } = user;

    return res.status(200).json({
      success: true,
      msg: "OK",
      data: {
        user: others,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server error",
      data: null,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    return res.status.json({
      success: true,
      msg: "OK",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server error",
      data: null,
    });
  }
};
