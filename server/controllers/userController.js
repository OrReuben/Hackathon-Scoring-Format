const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).json("Wrong credentials!");
    }

    const { _id } = user;
    const userToken = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    res.cookie("userToken", userToken, cookieOptions);
    return res.json("Cookie set successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Please provide a username and password");
    }

    const existingUser = await User.findOne({ username }).lean();
    if (existingUser) {
      return res.status(404).json("User already exists!");
    }

    const { _id } = await User.create({
      username,
      password: bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS)),
    });

    const userToken = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    res.cookie("userToken", userToken, cookieOptions);
    return res.json("Cookie set successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


module.exports = { login, register };
