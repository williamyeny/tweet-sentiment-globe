var express = require("express");
var app = express();
var path = require("path");
var twitter = require("twitter");
var nodeGeocoder = require("node-geocoder");
var sentiment = require("sentiment");

var config = require("./config.json");

var keys = config.twitter;
var client = new twitter(keys);

var options = {provider: "google", apiKey: config.geocoder.api_key};
var geocoder = nodeGeocoder(options);

var port = 8080;

var currentEvent = {};


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

  res.render('index', {});
});

var server = app.listen(port, function() {
  console.log("server started");
  var stream = client.stream("statuses/filter", {track: "trump", language: "en"});
  stream.on('data', function(event) {
    try {
      if (event.user.location !== null && event.user.location !== undefined) {
        currentEvent.text = event.text;
        currentEvent.location = event.user.location;
        // console.log(currentEvent.location);
      }
    } catch (e) {
      console.log("Error on getting location: " + e);
    }



  });
});

var io = require('socket.io')(server);

io.on("connection", function(socket) {
  console.log("connected");

  socket.on("get data", function() {

    //get coordinates
    geocoder.geocode(currentEvent.location, function(err, location) {
      console.log("GEOCODE USED");
      try {
        currentEvent.latitude = location[0].latitude;
        currentEvent.longitude = location[0].longitude;
        currentEvent.comparative = sentiment(currentEvent.text).comparative;

        socket.emit("get data", currentEvent);
      } catch (e) {
        console.log("Error on sending data: " + err);
      }
    });

  });

  socket.on("disconnect", function(client) {
    console.log("disconnected");
  });
});

function searchTweet(query, iterations, callback, hash, since_id) { //recursive function to "add" tweets

  if (since_id === undefined) { since_id = Number.MAX_VALUE; }

  client.get('search/tweets', {q: query, count: 100, max_id:since_id, geocode:"37.781157,-122.398720,15000mi"}, function(error, tweets, response) {
    if (hash === undefined) {
      hash = tweets;
    } else {
      hash.statuses = hash.statuses.concat(tweets.statuses);
    }
    // console.log("Error: " + error);
    // console.log("Tweet: ");
    // console.log(tweets);

    if (iterations > 1) {
      searchTweet(query, iterations - 1, callback, hash, tweets.statuses[tweets.statuses.length-1].id);
    } else {
      callback(hash.statuses);
    }

  });
}
