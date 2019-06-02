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

// EVENT DELEGATION...
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
        load_comments(result);
    });
    
});

// // Event delegation for '#comment_submit' modal button...
// $(document).on('click', '#comment_submit', (event) => {
//     console.log('Submitting comment...');

//     let c_post = {
//         UserId: 1, 
//         // album: , 
//         // artist: , 
//         // song: , 
//         body: $('#c_body'), 
//         rating: $('#c_rating')
//     };
// });


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

function load_artist_songs (x) {
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

function load_comments (x) {
    console.log('data was sent...');
    $('#display').empty();

    let comments = `
        <div class="row" id="comments"></div>
    `;
    
    let comment = `
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#comment_modal">Comment</a>

        <!-- Modal Structure -->
        <div id="comment_modal" class="modal">
            <div class="modal-content">
                <!--
                <h5 class="col s4 left">Rating:</h5>
                -->
                <div class="input-field col s8 right" >
                    <select id="c_rating">
                        <!--
                        <option value="" disabled selected>Choose your option</option>
                        -->
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label>Rating</label>
                </div>
                <div class="input-field col s12">
                    <textarea 
                    class="materialize-textarea"
                    id="c_body"
                    ></textarea>
                    <label for="c_body">Leave a comment...</label>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect waves-green btn-flat" id="comment_submit">Submit</a>
                <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>
            </div>
        </div>
    `;

    $('#display').append(comment);
    $('#display').append(comments);


    // enable materialize modal button...
    $('.modal').modal();
    // enable materialize rating select...
    $('select').formSelect();

    if (x.data) {
        console.log('data was recieved back!');
        console.log(x.data);

        x.data.forEach((post_data) => {

            let post = `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
                <div class="card-panel grey lighten-5 z-depth-1">
                    <div class="row valign-wrapper">
                        <div class="col s2">
                            <img src="https://avatars2.githubusercontent.com/u/27834803?s=460&v=4" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                        </div>
                        <div class="col s10">
                            <h5>${post_data.user_id}</h5>
                            <span class="black-text">
                            ${post_data.body}
                            </span>
                            <p>Rating: ${post_data.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            $('#comments').append(post);
            
        });
    }

    // Event delegation for '#comment_submit' modal button...
    $(document).on('click', '#comment_submit', (event) => {
        event.preventDefault();
        console.log('Submitting comment...');

        let c_post = {
            UserId: x.data.length + 1, 
            album: x.meta.album, 
            artist: x.meta.artists, 
            song: x.meta.song, 
            body: $('#c_body').val(), 
            rating: $('#c_rating').val()
        };

        if (c_post.body === '' 
        || c_post.body === undefined 
        || c_post.body === null) {
            alert(`You can't submit a blank comment.`);
        }
        else {
            // console.log(c_post);
            $.post('/api/posts/create', c_post).then( (result) => {
                console.log('Post successful! Posted the following data: ', result);

                // function that reloads page with results...
                
            });
        }
    });
}
