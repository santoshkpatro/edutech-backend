const expess = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/database");

const app = expess();

// DB Setup
db();

app.use(cors());
app.use(expess.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Health Ok");
});

const authRoutes = require("./api/auth/routes/authRoutes");
const userRoutes = require("./api/v1/routes/userRoutes");
const courseRoutes = require("./api/v1/routes/courseRoutes");

app.use("/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/courses", courseRoutes);

module.exports = app;
