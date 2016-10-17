var express = require("express");
var app = express();
var path = require("path");
var Twitter = require("twitter");

var keys = require("./config.json");
console.log(keys);

var port = 8080;

var client = new Twitter(keys);



app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

  res.render('index', {});
});

app.listen(port, function() {
  console.log("listening...");

  searchTweet("sad%20OR%20depressed%20OR%20unhappy", 10, function(tweets) {
    console.log("number of tweets: " + tweets.length);
    // for (i = 0; i < tweets.length-1; i++) {
    //   // console.log("tweet " + i + ": " + tweets[i].id);
    //   if (tweets[i].id > tweets[i+1].id) {
    //     console.log("gud");
    //   } else {
    //     console.log("no");
    //   }
    // }
  });
});


// function searchTweet(query, iterations, callback, hash) { //recursive function to "add" tweets
//
//   client.get('search/tweets', {q: query, count: 5}, function(error, tweets, response) {
//     if (hash === undefined) {
//       hash = tweets;
//     } else {
//       hash.statuses.concat(tweets.statuses);
//     }
//
//     console.log(tweets.search_metadata.next_results);
//
//     if (iterations > 0) {
//       searchTweet(tweets.search_metadata.next_results, iterations - 1, callback, hash);
//     } else {
//       callback(hash.statuses);
//     }
//
//   });
// }

function searchTweet(query, iterations, callback, hash, since_id) { //recursive function to "add" tweets

  if (since_id === undefined) { since_id = Number.MAX_VALUE; }

  client.get('search/tweets', {q: query, count: 100, max_id:since_id}, function(error, tweets, response) {
    if (hash === undefined) {
      hash = tweets;
    } else {
      hash.statuses = hash.statuses.concat(tweets.statuses);
      console.log("hash length: " + hash.statuses.length);
    }

    if (iterations > 1) {
      searchTweet(query, iterations - 1, callback, hash, tweets.statuses[tweets.statuses.length-1].id);
    } else {
      callback(hash.statuses);
    }

  });
}
