module.exports.getHttpCookie = (req, res) => {
  if (req.cookies.userToken) {
    return res.json(req.cookies.userToken);
  }
  return res.status(500).json('No token was found');
};
