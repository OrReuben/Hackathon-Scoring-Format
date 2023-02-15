const express = require("express");
const mongoose = require("mongoose");
const Score = require("./models/scoreModel");
const User = require("./models/userSchema");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ totalScore: -1 });
    return res.send(scores);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
});

app.patch("/update-scores", async (req, res) => {
  try {
    const { project, contestants, score } = req.body;

    const projectExists = await Score.findOne({ project, contestants });

    if (!projectExists) {
      const newScore = new Score({ project, contestants, totalScore: score });
      await newScore.save();
      return res.status(201).send({ message: "Score created successfully" });
    }
    try {
      await Score.updateOne(
        { project, contestants },
        { $inc: { totalScore: score } }
      );
      return res.status(200).send({ message: "Score updated successfully" });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
