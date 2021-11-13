const express = require("express");
const routes = require("./routes");
const connectDB = require("./db");

// Users: admin, password: hunter2

// App Config
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/routes', routes)

// DB Config
connectDB();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
