const User = require("../models/userSchema");


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      return res.status(200).send("Successful Login");
    } else {
      return res.status(404).send("Incorrect credentials");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if ((username, password)) {
      await User.create({ username, password });
      res.status(200).send("User has been created successfully");
    } else {
      res.status(400).send("Something went wrong");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { login, register };
