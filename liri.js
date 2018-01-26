//import keys.js
const Keys = require("./keys.js");
//require fs
const fs = require('fs');
//Import Request Package
const request = require("request");
//grab twitter keys
const twitClient = Keys.client;
//Grab spotify Keys
const spotify = Keys.spotify;
//grab user args
const command = process.argv[2];
//Random song inside of random.txt
var randomSongName;

//Run Twitter Request if command is my-tweets
if (command === 'my-tweets') {
  //Get Tweets from specified screen_name
  //provide Twitter Handle for API call
  var params = {
    screen_name: "pinkerbell23"
  };

  twitClient.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      //Loop through each tweet inside response data
      for (var i = 0; i < tweets.length; i++) {
        console.log(`\nTweet ${i + 1}: ${tweets[i].text}`);
        console.log(`Created On: ${tweets[i].created_at}`);
        console.log("\n-------------------");
      }
    } else {
      console.log(error);
    }
  });
}

//Get song information from Spotify API
if (command == 'spotify-this-song') {
  var songName = process.argv[3];

  spotify.search({ type: 'track', query: `${songName}` }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log artist name
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      //Console.log Song Name
      console.log(`Song Name: ${data.tracks.items[0].name}`);
      // log link to song
      console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
      //Log album name
      console.log(`Album: ${data.tracks.items[0].album.name}`);
 
  });
}


//getMovie function 


function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}


//run command for random.txt
if (command === 'do-what-it-says') {
    doStuff();
}


function doStuff () {
  fs.readFile('random.txt', 'utf8', function(err, data) {
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(error);
      }
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
      randomSongName = dataArr[1];
      //perform search after randomSongName has been defined
      spotify.search({ type: 'track', query: `${randomSongName}` }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // console.log artist name
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        //Console.log Song Name
        console.log(`Song Name: ${data.tracks.items[0].name}`);
        // log link to song
        console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
        //Log album name
        console.log(`Album: ${data.tracks.items[0].album.name}`);
    });
  });
}