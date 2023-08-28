const express = require("express");
const {
  getScores,
  resetScores,
  updateScores,
} = require("../controllers/scoreController");
const { jwtTokenIsValid } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.get("/", jwtTokenIsValid, getScores);
router.delete("/reset", jwtTokenIsValid, resetScores);
router.patch("/update-scores", updateScores);

module.exports = router;
