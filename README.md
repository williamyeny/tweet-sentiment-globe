# Geographical Sentiment Analysis of Trump-Related Tweets

Shows the location of live Trump-related tweets as well as the sentiment (whether the tweet has positive or negative "feeling") in bars.

Green bars have positive sentiment, red means negative. The length of the bar indicates the magnitude of the sentiment.

Please note this does not mean green = for Trump and red = against Trump. It simply analyzes the words inside the tweet and scores them based on how positive or negative the words are. For example, the tweet "Trump is not a loving, caring owner of half a dozen happy, adorable puppies" will show up as a large green bar due to positive words such as "loving", "caring", etc. but the tweet itself is not Trump-supporting.

### UPDATE: This was the code challenge for the Capital One Engineering Summit and I was accepted, with this project being a top 10 submission!

## How it works
Tweets are streamed live into the backend using the Twitter API. Every half a second the last recorded tweet has the location of where the tweeter lives in recorded. The location in city form is then passed into the Google geocoding API, which converts it into latitude and longitude. Then, the sentiment of the tweet is calculated using a sentiment node module. Finally, the latitude, longitude and sentiment data is passed into the client using socket.io and the globe is updated accordingly.

## Frameworks/libraries used

### Core:
Node.js

Express

WebGL Globe

socket.io

### Data:
twitter (npm package)

node-geocoder (npm package)

sentiment (npm package)

## Running this project

### config.json

In order to run this project you must create a config.json file. Grab your Twitter API and Google Geocoding API keys and arrange them like this:

```
{
  "twitter": {
    "consumer_key": "",
    "consumer_secret": "",
    "access_token_key": "",
    "access_token_secret": ""
  },
  "geocoder": {
    "api_key": ""
  }
}
```

### Launching

Use `npm install` to install required packages. `node index.js` to launch and direct your browser to `http://localhost:8080`

## (Anticipated) FAQ

### Why Trump tweets?

After much thought, I believed tweets relating to Trump would return the most interesting and extreme data. I considered adding a way to switch between Trump and Hillary keywords but due to the way Twitter Streaming API works it would overload my API key. Please note there is no political bias in this web app.

### Why Streaming API as opposed to the RESTful API?

The Streaming API lets me gather a theoretically infinite amount of data from just one call. Furthermore, the normal search tweet function only lets me gather 100 tweets per call. I created a workaround to gather a technically infinite amount of data but I had to do more calls, i.e. 10 calls for 1000 tweets.

### Why is all your HTML, CSS and JS in one file?

It came like that. Blame Google.
