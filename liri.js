require("dotenv").config();

var axios = require("axios");
var keys = require("./keys");
var Spotify = require("node-spotify-api");

var moment = require("moment");

// var userInputSong = process.argv[4];
var userInput = process.argv[3];
var userChoice = process.argv[2];
switch (userChoice) {
    case "concert-this":
        console.log("concert");
        concertThis();
        break;
    case "spotify-this-song":
        console.log("spotify");


        spotifyThisSong();

        break;
    case "movie-this":
        console.log("movie");

        thisMovie();

        break;
    case "do-what-it-says":
        console.log("whatever");
        break;


};

function concertThis() {

    var artist = process.argv[4];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.band.id;
    axios.get(queryUrl).then(function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var artistData = JSON.parse(body.data);

            var resultBand = " Name of the venue" + artistData.venue.name +
                "\nVenue location" + artistData.venue.city +
                "\nDate of the Event " + moment(artistData.datetime).format("MM/DD/YYYY");

            console.log(resultBand);

        } else {
            console.log('error:', error);
        }

    })
}


function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);
    var userSong = process.argv[4];
    if (!userSong) {
        userSong = "The Sign";
    }

    spotify.search({ type: 'track', query: userSong, limit: 1 }, function (err, data) {

        if (err) {
            return console.log("Error:" + err);

        } else {
            var spotifyData = data.tracks.items;
            console.log(spotifyData)
            var spotifyResult = "Artist:" + spotifyData[0].artist[0].name +
                "\nThe song name: " + spotifyData[0].external_urls.name +
                "\nLink of the song:" + spotifyData[0].preview_url +
                "\nThe Album of the Song:"
            console.log(spotifyResult);




        }



    });
}


function thisMovie() {

    //run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + keys.omdb.id;
    // console.log(queryUrl);
    axios.get(queryUrl).then(function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var moviesBody = JSON.parse(body.data);
            // console.log(moviesData);
            var listOfMovies = "title of movie:" + moviesBody.Title +
                "\nYear of the movie:" + moviesBody.Year +
                "\nIMDB Rating of the movie:" + moviesBody.Ratings[0].value +
                "\nRotten Tomatoes Rating of the movie:" + moviesBody.Ratings[1].Value +
                "\nCountry of Production:" + moviesBody.Counrty +
                "\nLanguage of the movie:" + moviesBody.Language +
                "\nPlot of the movie:" + moviesBody.Plot +
                "\nActors in the movie:" + moviesBody.Actors
            console.log(listOfMovies);

        } else {
            console.log('error:', error);
        }

    })
}
// spotifyThisSong();
// thisMovie();
// concertThis();