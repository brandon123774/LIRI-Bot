# LIRI-Bot

## Table of Contents
* Introduction
* Interesting bits of code
* Technologies Used
* How to use

## Introduction
This program is run in terminal or bash. This program is to run similarly to SIRI on apple products, but instead of speech interpretation and recognition, this is language interpretation and recognition. The idea of this program is to be able to read the given data in the command line and respond using the given actions.

## Bits of code 
//variables to use to link/use spotify
    var fs = require("fs");
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

//functions for the differing api's
function userInput(userOptions, inputParameter) {
    switch (userOptions) {
        // case 'concert-this':
        //     displayConcertInfo(inputParameter);
        //     break;
        case 'spotify-this-song':
            displaySongInfo(inputParameter);
            break;
        case 'movie-this':
            displayMovieInfo(inputParameter);
            break;
        case 'do-what-it-says':
            displaySomeInfo();
            break;
        default:
            console.log("Please select from the following options:\nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

//Function for Spotify
function displaySongInfo(inputParameter) {
    //the default song listed
    if (inputParameter === undefined) {
        inputParameter = "The Sign";
    }
    //search in spotify
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (error, data) {
            if (error) {
                console.log("Error: " + error);
                return;
            }
            //variable for song name
            var songs = data.tracks.items;
            for (i = 0; i < songs.length; i++) {
                console.log("***SONG INFO HERE***");
                fs.appendFileSync("log.txt", "***SONG INFO HERE***\n");

                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                //song name
                console.log("Song: " + songs[i].name);
                fs.appendFileSync("log.txt", "Song: " + songs[i].name + "\n");
                //preview the song
                console.log("Preview Song: " + songs[i].preview_url + "\n");
                fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
                //album that the song is from
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "Album: " + songs[i].album.name);
                //song artist
                console.log("Artist :" + songs[i].artists[0].name + "\n");
                fs.appendFileSync("log.txt", "Artist :" + songs[i].artists[0].name + "\n");

                console.log("************");
                fs.appendFileSync("log.txt", "************");

            }
        }

    );
};

![](name-of-giphy.gif)
## Technologies
Project is created using the following:
* Javascript
* Node.js
* Axios
* API's

# How to use
Follow the command line prompts and select and then type out responses to find out more about them. Whether it is a band, a movie, or a song, you can search for more information regarding them. 

	