var express = require("express");
var app = express();
var path = require("path");

var port = 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log("listening...");
});
