var express = require("express");
var app = express();
var path = require("path");
var Twitter = require("twitter");

var keys = require("./config.json");
console.log(keys);

var port = 8080;

var client = new Twitter(keys);

client.get('search/tweets', {q: 'sad%20OR%20depressed%20OR%20unhappy', count: 200}, function(error, tweets, response) {
  console.log(tweets["statuses"].length);

});

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render('index', {});
});

app.listen(port, function() {
  console.log("listening...");
});
