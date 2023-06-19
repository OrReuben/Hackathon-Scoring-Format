const Score = require("../models/scoreModel");


const selectTeam = async (req,res) => {

}
const getScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ totalScore: -1 });
    return res.send(scores);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const resetScores = async (req, res) => {
  try {
    await Score.deleteMany({});
    return res.send("All scores has been successfully resetted!");
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const updateScores = async (req, res) => {
  try {
    const { project, contestants, score } = req.body;

    const projectExists = await Score.findOne({ project, contestants });

    if (!projectExists) {
      const newScore = new Score({
        project,
        contestants,
        totalScore: score,
        totalVotes: 1,
      });
      await newScore.save();
      return res.status(201).send({ message: "Score created successfully" });
    }
    try {
      await Score.updateOne(
        { project, contestants },
        { $inc: { totalScore: score, totalVotes: 1 } }
      );
      return res.status(200).send({ message: "Score updated successfully" });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getScores, resetScores, updateScores };
