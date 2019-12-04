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

//Function for Spotify

function showSongInfo(inputParameter)   {
    //the default song listed
    if (inputParameter === undefined)   {
        inputParameter = "The Sign";
    }
    //search in spotify
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (error, data)    {
            if (error)
            console.log("Error: " + error);
            return;
        }
        //variable for song name
        var songs = data.tracks.items;

        for (i = 0; i < songs.length; i++)  {
            console.log("***SONG INFO HERE***");
            fs.appendFileSync("log.txt", "***SONG INFO HERE***\n");

            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            //song name
            console.log("Song: " + songs[i].name);
            fs.appendFileSync("log.txt", "Song: " + songs[i].name + "\n");
            //preview the song
            console.log("Preview Song: "+ songs[i].preview_url + "\n");
            fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
            //album of the song/ albums of the artist
            console.log("Album: " + songs[i].album.name);
            fs.appendFileSync("log.txt", "Album: " + songs[i].album.name);
            //song artist
            console.log("Artist :" + songs[i].artists[0].name + "\n");
            fs.appendFileSync("log.txt","Artist :" + songs[i].artists[0].name + "\n");

            console.log("************");
            fs.appendFileSync("log.txt", "************");

        }   
    }

    );
};