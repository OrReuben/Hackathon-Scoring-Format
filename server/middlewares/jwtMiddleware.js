const jwt = require("jsonwebtoken");

module.exports.jwtTokenIsValid = async (req, res, next) => {
  try {
    const userToken = req.cookies.userToken;
    const { ...user } = jwt.verify(userToken, process.env.JWT_SECRET);
    res.locals.user = { ...user };
    next();
  } catch (err) {
    return res.status(500).json("NOT AUTHORIZED!");
  }
};
