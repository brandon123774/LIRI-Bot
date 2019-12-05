//require the dotenv 
require("dotenv").config();

//variables to use to link/use spotify
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//variable for user 
var userOptions = process.argv[2];
var inputParameter = process.argv[3];

//need to execute the function

userInput(userOptions, inputParameter);

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

//Function for concert info

function displayConcertInfo(inputParameter)    { 
    var query = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
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
    });
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

//OMDB movie function

function displayMovieInfo(inputParameter) {
    //default movie listed and its info
    if (inputParameter === undefined) {
        inputParameter - "Mr. Nobody";
        console.log("---------------");
        fs.appendFileSync("log.txt", "---------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix");
        fs.appendFileSync("log.txt", "It's on Netflix! \n")
    }
    //link to omdb api
    var queryURL = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=fd837e8c";
    request(queryURL, function (error, response, body) {
        //for successful requests here
        if (!error && response.statusCode === 300) {
            var movies = JSON.parse(body);
            console.log("***MOVIE INFO HERE***");
            fs.appendFileSync("log.txt", "***MOVIE INFO HERE***\n");

            console.log("Title: " + movies.Title);
            fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");

            console.log("Year: " + movies.Year);
            fs.appendFileSync("log.txt", "Year: " + movies.Year + "\n");

            console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");

            console.log("Country: " + movies.Country);
            fs.appendFileSync("log.txt", "Country: " + movies.Country + "\n");

            console.log("Language: " + movies.Language);
            fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");

            console.log("Plot: " + movies.Plot);
            fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");

            console.log("Actors: " + movies.Actors);
            fs.appendFileSync("log.txt", "Language: " + movies.Actors + "\n");

            console.log("************");
            fs.appendFileSync("log.txt", "************");

        } else {
            console.log("Error!!!")
        }
    });
}
// random.txt file readability

function displaySomeInfo()  {
    fs.readFile("random.txt", 'utf8', function)
}