const express = require("express");
const path = require("path");
const routes = require("./routes");
const connectDB = require("./db");

// Users: admin, password: hunter2

// App Config
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
app.get("/", function (req, res) {
  res.send("404 Error");
});

// DB Config
connectDB();

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
