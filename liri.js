'require strict';

require("dotenv").config();
var keys = require('./keys');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');

// var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);
   
  var params = {screen_name: 'writeMeFam'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets[0].text);
    }
  });


var spotify = new spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

