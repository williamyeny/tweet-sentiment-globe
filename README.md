#Geographical Sentiment Analysis of Political Tweets

- description here -

##Frameworks/libraries used

###Core:
Node
Express
WebGL Globe
socket.io

###Data:
Twitter API
node-geocoder
sentiment

##How it works
Tweets are streamed live into the backend. Every half a second the last recorded tweet has the location of where the tweeter lives in recorded. The location in city form is then passed into a geocoder, which converts it into latitude and longitude. Then, the sentiment of the tweet is calculated using the sentiment module. Finally, the latitude, longitude and sentiment data is passed into the client using web sockets and the globe is updated accordingly.
