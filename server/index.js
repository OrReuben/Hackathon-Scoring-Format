const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoute");
const scoreRoutes = require("./routes/scoreRoute");
const socket = require("socket.io");

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/scores", scoreRoutes);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
const io = socket(server, {
  cors: ["http://localhost:5174"],
  credentials: true,
});

let currentTeam = null;

io.on("connection", (socket) => {
  socket.on("request-current-team", () => {
    if (currentTeam !== null) {
      socket.emit("current-team", currentTeam);
    }
  });

  socket.on("change-team", (newTeam) => {
    currentTeam = newTeam;
    socket.broadcast.emit("change-team", newTeam);
  });
});
