Listed here are tested routes for getting specific information back from the spotify API..

Considering we call our returned object `Result`...
    The array of tracks containing info of each track is:
        `result.tracks.items`. Lets set this array to a variable so that we don't have to keep typing that:
        `let tracks = result.tracks.items`.
        Note that `tracks` contain an array of objects.

        By using ES6's .map() higher order function, we can create a seperate array that will loop through all of these objects contained in this array of objects, and return those same objects containing only the data we want from them:
        
            let tracks_data = tracks.map( (track) => {
                return {
                    album_title: track.album.name,
                    album_image: track.album.images[0],
                    artists: track.artists.map( (artist) => {
                        return artist.name)
                        },
                    song_title: track.name,
                    preview: track.preview_url
                }
            });

        So now, `tracks_data` is an array containing objects that only have data that we need. We can now pass this array into handlebars by packaging it within an object's key/value pair:

            let hbsObj = {tracks: tracks_data};
            res.render('index', hbsObj);