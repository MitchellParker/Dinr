/*var express = require("express");
var app = express();


app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
// can not create the full server right now as that need all the css and html files to be ready 

*/



const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const uers = require("./routes");
const connectDB = require("./db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDB();


app.use('/uers', uers);    // DONT know what this is doing 

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

