// console.log('This is working...');
$(document).ready( () => {
    // targets...
    const $submit =         $('#submit');
    const $artist =         $('#artist');
    const $album =          $('#album');
    const $song =           $('#song');

    $(document).on('click', '#submit', (event) => {
        event.preventDefault();

        submit_search($artist, $album, $song);
        
    });
});

// FUNCTIONS...
function get_search_type (a, b, c) {
    if (a.is(':checked')) {
            return a[0].id;
        }
        else if (b.is(':checked')) {
            return b[0].id;
        }
        else if (c.is(':checked')) {
            return c[0].id;
        }
        else {
            console.log('please specify search type...');
            return;
        }
}

function submit_search(x, y, z) {
    if ( ($('#user_search').val().trim() === '') ) {
            alert('Please enter a search term...');
        }
        else if ( !(get_search_type(x, y, z)) ) {
            alert('Please specify a search type...');
        }
        else {
            let user_input = {
                input:      $('#user_search').val().trim(),
                type:       get_search_type(x, y, x)
            };
        
        console.log(user_input);
        switch(user_input.type) {
            case 'artist':
                $.get(`/api/spotify/artists/${user_input.input}`)
                    .then( (result) => {
                        load_artist_songs(result);
                    });
                break;
            case 'album':
                $.get(`/api/spotify/artists/${user_input.input}`).then(result => {
                    load_artist_songs(result);
                });
                break;
            case 'song':
                $.get(`/api/spotify/artists/${user_input.input}`).then(result => {
                    load_artist_songs(result);
                });
                break;
        }

        }
}

function load_artist_songs(x) {
    $('#display').empty();
    let table = `
    <table class="highlight">
        <thead>
            <tr>
                <th>Preview</th>
                <th>Artist(s)</th>
                <th>Title</th>
                <th>Album</th>
                <th>Length</th>
            </tr>
        </thead>
        <tbody id="results"></tbody>
    </table>
    `;
    $('#display').append(table);
    x.forEach(song => {
        $('#results').append(`
        <tr 
            class="selected_row"
            data-artists="${song.artists}" 
            data-song="${song.song_title}" 
            data-album="${song.album_title}"
        >
            <td><a href="${song.preview}" target="_blank"><i class="small material-icons">audiotrack</i></a></td>
            <td>${song.artists}</td>
            <td>${song.song_title}</td>
            <td>${song.album_title}</td>
            <td>${song.time}</td>
        </tr>
        `);
    });
}

// Event delegation for '.selected_row' class...
$(document).on('click', '.selected_row', (event) => {
    event.preventDefault();
    // console.log('This row was clicked...');
    let row = event.currentTarget.dataset;
    let selected_data = {
        artists: row.artists,
        song: row.song,
        album: row.album
    };
    console.log(selected_data);

    $.post('/api/posts/', selected_data).then((result) => {
        console.log('data was sent...');
        if (result) {
            console.log('data was recieved back!');
            console.log(result);
        }
    });
    
});
