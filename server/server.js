const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const UserRouter = require("./routes/UserRouter");


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret key",
  })
);
app.use(flash());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


// Handle any other route and render React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

app.use("/api/users", UserRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
