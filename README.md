#Geographical Sentiment Analysis of Trump-Related Tweets

Shows the location of live Trump-related tweets. It also shows the sentiment (whether the tweet has positive or negative "feeling") as bars.

Green bars have positive sentiment, red means negative. The length of the bar indicates the magnitude of the sentiment.

Please note this does not mean green = for Trump and red = against Trump. It simply analyzes the words inside the tweet and scores them based on how positive or negative the words are. For example, the tweet "Trump is not a loving, caring owner of half a dozen happy, adorable puppies" will show up as a large green bar due to positive words such as "loving", "caring", etc. but the tweet itself is not Trump-supporting.

##How it works
Tweets are streamed live into the backend using the Twitter API. Every half a second the last recorded tweet has the location of where the tweeter lives in recorded. The location in city form is then passed into the Google geocoding API, which converts it into latitude and longitude. Then, the sentiment of the tweet is calculated using a sentiment node module. Finally, the latitude, longitude and sentiment data is passed into the client using socket.io and the globe is updated accordingly.

##Frameworks/libraries used

###Core:
Node.js
Express
WebGL Globe
socket.io

###Data:
twitter (npm package)
node-geocoder (npm package)
sentiment (npm package)

## Running this project

###config.json

In order to run this project you must create a config.json file. Grab your Twitter API and Google Geocoding API keys.

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

###Launching

Use `npm install` to install required packages. `node index.js` to launch and direct your browser to `http://localhost:8080`
