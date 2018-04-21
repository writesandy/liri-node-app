'require strict';

require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


let getTweets = function(){
  var params = {screen_name: 'writeMeFam',
                count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (i=0; i < tweets.length; i++){
          console.log(tweets[i].text + " " + tweets[i].created_at)
        }
    }
  });
};

let getSpotify = function (selection){

    spotify.search({ type: 'track', query: selection }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items[0].name);
      // for (var i=0; i < data.tracks.items.length; i++){
      //   console.log(data.tracks.items[i].name);
      // }


});
};

let getMovie = function(selection) {
  var queryUrl = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy";
  console.log(selection);
  request(queryUrl, function(err, response, body){
    if(err) {
      throw err;
    } else {
    console.log(JSON.parse(body));
    }
  });

};

let getText = function() {

    fs.readFile('random.txt', 'utf8', function(err, data){
      console.log(data);
      var something = data.split(',');
      if(something.length === 2) {
        controller(something[0], something[1]);
      } else {
        controller(something[0]);
      }
    })

}


let controller = function(command,selection) {

switch (command) {
  case 'my-tweets':
    getTweets();
  break;

  case 'spotify-this-song':
    getSpotify(selection);

  break;

  case 'movie-this':

    getMovie(selection);

  break;

  case 'do-what-it-says':
    getText();

    break;
 default:
 console.log('do not recognize that command');
}
   
};

let command = process.argv[2];
let selection = process.argv[3];
controller(command,selection);

