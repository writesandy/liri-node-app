'require strict';

require("dotenv").config();
var keys = require('./keys');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');



var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

let command = process.argv[2];
let selection = process.argv;

let movieName = "";
let song = "";

switch (command) {
  // case 'my-tweets':
  // var params = {screen_name: 'writeMeFam',
  //               count: 20};
  // client.get('statuses/user_timeline', params, function(error, tweets, response) {
  //   if (!error) {
  //       for (i=0; i < tweets.length; i++){
  //         console.log(tweets[i].text + " " + tweets[i].created_at)
  //       }
  //   }
  // });
  // break;

  case 'spotify-this-song':
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
 
console.log(data); 
});


break;

  // case 'movie-this':
  // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // for (i = 3; i < selection.length; i++ ) {
  //   if(i > 3 && i < selection.length) {
  //     movieName = movieName + '+' + selection[i];
  //   } else {
  //       movieName += selection[i];
  //   }
  // }

  // console.log(movieName);
  // request(queryUrl, function(err, response, body){
  //   if(err) {
  //     throw err;
  //   } else {
  //   console.log(JSON.parse(body).Year);
  //   }
  // });

  // break;
  
}
   





