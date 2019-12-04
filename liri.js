//require the dotenv 
require("dotenv").config();

//variables to use to link/use spotify
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');

//variable for user 
var userOptions = process.argv[2];
var inputParameter = process.argv[3];

//need to execute the function

userInput(userOptions, inputParameter);

//functions for the differing api's
function userInput(userOptions, inputParameter) {
    switch (userOptions)    {
        case 'concert-this':
        showConcertInfo(inputParameter);
        break;
        case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;
        case 'movie-this':
        showMovieInfo(inputParameter);
        break;
        case 'do-what-it-says':
        showSomeInfo();
        break;
        default:
            console.log("Please select from the following options:\nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");ß
    }
}

//Function for concert info