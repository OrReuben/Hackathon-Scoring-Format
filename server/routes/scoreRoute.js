const express = require("express");
const { getScores, resetScores, updateScores } = require("../controllers/scoreController");
const router = express.Router();

router.get("/", getScores);
router.delete("/reset", resetScores);
router.patch("/update-scores", updateScores);

module.exports = router;
