require("dotenv").config()
const keyList = require("./keys.js")
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keyList.spotify)
const request = require("request")
const axios = require("axios")
const fs = require("fs")
const liriCmd = process.argv[2]
const title = process.argv[3]

//=============SpotifyThisSong is now working don't touch this. Chris 3/2/22===============//
function spotifyThisSong() {
    if (title == null) {
        //send the request to the Spotify API
        spotify.search(
            {
                type: "track",
                query: "The Sign" && "Ace of Base",
                limit: 1
            },

            function (err, data) {
                if (err) {
                    return console.log("Error: " + err)
                }
                console.log("Artist: ", data.tracks.items[0].artists[0].name)
                console.log("Song: ", data.tracks.items[0].name)
                console.log("Preview: ", data.tracks.items[0].preview_url)
                console.log("Album: ", data.tracks.items[0].album.name)
            })
    }
    else {
        spotify.search(
            {
                type: "track",
                query: title,
                limit: 1
            }, function (err, data) {
                if (err) {
                    return console.log("Error: " + err)
                }
                console.log("Artist: ", data.tracks.items[0].artists[0].name)
                console.log("Song: ", data.tracks.items[0].name)
                console.log("Preview: ", data.tracks.items[0].preview_url)
                console.log("Album: ", data.tracks.items[0].album.name)
            })
    }
}

//==============movieThis is now working. chris 3/2/22==========//
function movieThis() {
    //If the user does not enter a movie title, the utility will default to a search for the movie Mr. Nobody"
    if (title == null) {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
            .then(
                function (response) {
                    console.log(response)
                    console.log("The Title is " + response.data.Title)
                    console.log("The Rating is " + response.data.Genre)
                    console.log("The Release year was " + response.data.Year)
                }
            )
    }

    else {
        const movieName = process.argv[3]
        const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
        axios.get(queryUrl)
            .then(function (response) {
                const moviedata = response.data;
                console.log(`title: ${moviedata.Title}`)
                console.log(`year: ${moviedata.Year}`)
                console.log(`rated: ${moviedata.Rated}`)
                console.log(`released: ${moviedata.Released}`)
                console.log(`director: ${moviedata.Director}`)
                console.log(`writer: ${moviedata.Writer}`)
                console.log(`actors: ${moviedata.Actors}`)
            })
    }
}

var bandApi = keyList.apiKeys.bands;

//==============concertThis is differently not working==========//
function concertThis() {
    const artist = process.argv[3]
    const queryURL = (" https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandApi)
    axios.get(queryURL)
        .then(function (response) {
            var concert = response.data;
            console.log(concert[0].venue.name);
            console.log(concert[0].venue.country);
            console.log(concert[0].festival_start_date);
        })
        .catch(function (error) {
            console.log(error)
        })
}

//LIRI Commands
function commands(liriCmd, input) {
    switch (liriCmd) {
        case "do-what-it-says":
            doWhatItSays()
            break
        case "concert-this":
            concertThis()
            break
        case "spotify-this-song":
            spotifyThisSong()
            break
        case "movie-this":
            movieThis()
            break
    }
}


//getting data from random.txt is now working. ===========================================
function doWhatItSays() {
    //Reads text in random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        else {
            console.log(data)
        }
    })
}
commands(liriCmd)


