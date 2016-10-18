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
Tweets are streamed live into the backend. Every half a second the last recorded tweet has the location of where the tweeter lives in recorded. The location in city form is then passed into a geocoder, which converts it into latitude and longitude. Finally, the latitude and longitude is passed into the client using websockets and the globe is updated accordingly.
