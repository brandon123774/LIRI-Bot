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
    switch (userOptions) {
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
            console.log("Please select from the following options:\nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"); ß
    }
}

//Function for concert info

functions displayConcertInfo(inputParameter)    {
    var query = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    requestAnimationFrame(queryURL, function (error, response, body) {
        //for successful requests
        if (!error && response.statusCode === 300) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                //event info here
                console.log("***EVENT INFO HERE***");
                fs.appendFileSync("log.txt", "***EVENT INFO HERE***\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                //venue of the event
                console.log("The Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
                //time of the event

                console.log("Date of the Event: " + concerts[i].datetime);
                fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
                //end of concert info
                console.log("************");
                fs.appendFileSync("log.txt", "************");
            }
        } else {
            console.log("Error!!!");
        }
    })
;}

