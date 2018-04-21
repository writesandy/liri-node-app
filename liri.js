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
      console.log("Song Name: " +data.tracks.items[0].name);
      console.log("Artist Name: "+data.tracks.items[0].artists[0].name);
      console.log("Album Name: " +data.tracks.items[0].album.name);    
      console.log("Listen on Spotify" +data.tracks.items[0].external_urls.spotify);

      // }


});
};

let getMovie = function(selection) {
  var queryUrl = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(err, response, body){
    if(err) {
      throw err;

    } else if (!selection) {

      console.log("If you haven't watched 'Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix");

    } else  {
      console.log(JSON.parse(body).Title + " was released in " +JSON.parse(body).Year + " and produced in " +JSON.parse(body).Country);
      console.log(JSON.parse(body).Title + " IMDB rating is " +JSON.parse(body).imdbRating+ " and the ID is: " +JSON.parse(body).imdbID);
      console.log('Available in languages: ' +JSON.parse(body).Language);
      console.log(JSON.parse(body).Ratings[1].Source +" rating: " +JSON.parse(body).Ratings[1].Value);
      console.log('The movie starred: ' +JSON.parse(body).Actors)
      console.log('Plot: ' +JSON.parse(body).Plot);
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
 console.log('Enter one of these choices to play:');
 console.log('my-tweets: give you a list of my recent tweets');
 console.log('spotify-this-song "song name"');
 console.log('movie-this "movie name"');
 console.log('do-what-it-says');
}
   
};

let command = process.argv[2];
let selection = process.argv[3];
controller(command,selection);

