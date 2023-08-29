const jwt = require("jsonwebtoken");

module.exports.jwtTokenIsValid = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const userToken = authHeader.split(" ")[1];
      const { ...user } = jwt.verify(userToken, process.env.JWT_SECRET);
      res.locals.user = { ...user };
      next();
    } else {
      return res.status(404).json("NOT AUTHORIZED!")
    }
  } catch (err) {
    return res.status(500).json("NOT AUTHORIZED!");
  }
};
