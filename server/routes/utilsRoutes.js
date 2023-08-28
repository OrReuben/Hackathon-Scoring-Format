const express = require("express");
const { getHttpCookie } = require("../controllers/utilsController");
const router = express.Router();

router.get("/get-token", getHttpCookie);


module.exports = router;
