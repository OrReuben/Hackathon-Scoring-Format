const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoute");
const scoreRoutes = require("./routes/scoreRoute");
const utilsRoutes = require("./routes/utilsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const { jwtTokenIsValid } = require("./middlewares/jwtMiddleware");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://hackathon-scoring-api.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/scores", scoreRoutes);
app.use("/admin", adminRoutes);
app.use("/utils", utilsRoutes);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const io = socket(server, {
  cors: [
    ["http://localhost:5174", "https://hackathon-scoring-api.onrender.com"],
  ],
  credentials: true,
});

let currentTeam = null;
let connectedSockets = new Set();

io.on("connection", (socket) => {
  connectedSockets.add(socket);

  socket.on("request-current-team", () => {
    if (currentTeam !== null) {
      socket.emit("current-team", currentTeam);
    }
  });

  socket.on("change-team", (newTeam) => {
    currentTeam = newTeam;
    socket.broadcast.emit("change-team", newTeam);
  });

  socket.on("disconnect", () => {
    connectedSockets.delete(socket);

    if (connectedSockets.size === 0) {
      setTimeout(() => {
        if (connectedSockets.size === 0) {
          currentTeam = null;
        }
      }, 3 * 60 * 1000);
    }
  });
});
