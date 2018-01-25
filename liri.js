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

//Get OMDB Movie Data with Request Package
if (command === "movie-this") {
  var movie = process.argv[3];
  request(`http://www.omdbapi.com/?i=tt3896198&apikey=b2c0040f=${movie}`, function(error, response, body) {
    if (error) {
      console.log("error:", error); // Print the error if one occurred
    } else {
      // console.log(JSON.parse(body));
      console.log(`Title: ${JSON.parse(body).Title}`); //movie title
      console.log(`Year: ${JSON.parse(body).Year}`); //movie year
      console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`); //IMDB Rating
      console.log(
        `Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`
      ); //Rotten tomatoes rating
      console.log(`Country: ${JSON.parse(body).Country}`); //Country
      console.log(`Language(s): ${JSON.parse(body).Language}`); //Language
      console.log(`Plot: ${JSON.parse(body).Plot}`); //Plot
      console.log(`Actors: ${JSON.parse(body).Actors}`); //Actors
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