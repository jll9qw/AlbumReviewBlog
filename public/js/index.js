//============================== MAIN...

$(document).ready( () => {
    // targets...
    const $submit =         $('#submit');
    const $artist =         $('#artist');
    const $album =          $('#album');
    const $song =           $('#song');

    init();
    $('#display').remove('#cm_btn');

    //========== LISTENERS...

    $('#log_in').on('click', (event) => {
        event.preventDefault();
        console.log('Signing in...');
        log_in();
    });

    $('#sign_up').on('click', (event) => {
        event.preventDefault();
        console.log('Processing...');
        register();
    });

    $('#submit').on('click', (event) => {
        event.preventDefault();
        submit_search($artist, $album, $song); 
    });

    validate_length( $('#su_user_name'), $('#su_un_d'), 3, 15 );
    validate_length( $('#su_password'), $('#su_up_d'), 6, 15 );
    load_user_status();
});

//============================== EVENT DELEGATION...

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

    $.post('/api/posts/', selected_data)
        .then((result) => {
            console.log(result);
            $('#display').empty();
            // load_comment_button(result);
            load_cb_if_logged_in(result);
            
            load_comments(result);
    });
});


//============================== FUNCTIONS...

function load_cb_if_logged_in (resp) {
    if (sessionStorage.getItem('user_data')) {
        let x = JSON.parse(sessionStorage.getItem('user_data'));
        load_comment_button(sessionStorage.getItem('user_data'), resp);
    }
}

function load_user_status (a) {
    if (sessionStorage.getItem('user_data')) {
        if (a === undefined) {
            a = JSON.parse(sessionStorage.getItem('user_data'));
        }
        let status = `
        <div class="col s12 center">
            <a 
                class="waves-effect waves-light btn-flat white-text btn modal-trigger right" 
                href="#"
            >Welcome back, ${a.user_name}
            </a>
        </div>
        `;
        $('#user_status').empty();
        $('#user_status').prepend(status);
    }
}

function save_user_data (data) {
    // sessionStorage.clear();
    let dataToKeep = {
        id: data.id,
        user_name: data.user_name,
        user_email: data.user_email,
        user_avatar: data.user_avatar,
        Posts: data.Posts
    };
    sessionStorage.setItem('user_data', JSON.stringify(dataToKeep));
}

function init () {
    // enable materialize modal button...
    $('.modal').modal();
    // enable materialize rating select...
    $('select').formSelect();
    // enable materialize text input functionality...
    $('input#input_text, textarea#textarea2').characterCounter();
}

function log_in () {
    let data = {
        user_email: $('#li_email').val().trim(),
        user_password: $('#li_password').val().trim()
    };

    // Use a post route to send {data} to db and return UserId and email if it exists in db...
    $.post('/api/users/auth', data).then( result => {
            if (typeof result === 'object') {
                console.log(`Log in successful! Welcome back ${result.user_name}`);
                // console.log(result);
                save_user_data(result);
                load_user_status();
            }
            else {
                alert(result);
            }
        });
}

function register () {
    let data = {
        user_name: $('#su_user_name').val().trim(),
        user_email: $('#su_user_email').val().trim(),
        user_password: $('#su_password').val().trim(),
        user_avatar: $('#su_user_avatar').val().trim()
    };

    let nameValid = validate_length( $('#su_user_name'), $('#su_un_d'), 3, 15, 'Username' );
    let passValid = validate_length( $('#su_password'), $('#su_up_d'), 6, 15, 'Password' );

    if (!nameValid) {
        console.log('username is NOT valid');
    } else if (!passValid) {
        console.log('password is NOT valid');
    }
    else {
        console.log('Everything is valid');
        // Use a post route to send {data} to db, create a new user using that data, and return the UserId and email from the db...
        $.post('/api/users', data).then( result => {
            if (typeof result === 'object') {
                console.log(`Registration successful!`);
                save_user_data(result);
                load_user_status();
            }
            else if (typeof result === 'string') {
                alert(result);
            }
            else {
                console.log(result);
            }
        });
    }
}

function validate_length (a, b, x, y, z) {
    let length = a.val().trim().length;
    a.keyup( () => {
        if (a.val().trim().length < x) {
            a.addClass('invalid');
            b.attr('data-error', 'Too short!');
        }
        else if (a.val().trim().length > y) {
            a.addClass('invalid');
            b.attr('data-error', 'Too long!');
        }
        else {
            a.removeClass('invalid');
        }
    });

    let valid = false;
    if ( !(length < x || length > y) ) {
        a.removeClass('invalid');
        valid = true;
    }

    if (z) {
        if (!valid) {
            alert(`${z} is invalid`);
        }
    }

    return valid;
}

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
                        $('#display').empty();
                        load_artist_songs(result);
                });
                break;
            case 'album':
                $.get(`/api/spotify/artists/${user_input.input}`).then(result => {
                    $('#display').empty();
                    load_artist_songs(result);
                });
                break;
            case 'song':
                $.get(`/api/spotify/artists/${user_input.input}`).then(result => {
                    $('#display').empty();
                    load_artist_songs(result);
                });
                break;
        }

        }
}

function load_artist_songs (x) {
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

function load_comment_button (x, y) {
    console.log('load comment btn recieved: ', y.data.length);
    let comment = `
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#comment_modal" id="cm_btn">Comment</a>

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

    $('#display').prepend(comment);
    init();

    // Event delegation for '#comment_submit' modal button...
    $(document).on('click', '#comment_submit', (event) => {
        event.preventDefault();
        console.log(x);
        console.log('Submitting comment...');
        console.log(y.data.length++);
        let c_post = {
            UserId: y.data.length + 1,
            user_id: x.id, 
            album: y.meta.album, 
            artist: y.meta.artists, 
            song: y.meta.song, 
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
            $.post('/api/posts/create', c_post)
                .then( (result) => {
                    console.log('Post successful! Posted the following data: ', result);

                    // function that reloads page with results...
                        // probably best to do this on the server side with a res.render() using handlebars...
            });
        }
    });
}

function load_comments (x) {
    console.log('data was sent...');
    let comments = `
        <div class="row" id="comments"></div>
    `;

    // $('#display').append(comment);
    $('#display').append(comments);

    if (x.data) {
        console.log('data was recieved back!');
        console.log(x.data);

        x.data.forEach((post_data) => {
            $.get('/api/users').then( result => {
                let author = result.filter( (user) => {
                    user.id === post_data.user_id ? true : false;
                });
            });
            let post = `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
                <div class="card-panel grey lighten-5 z-depth-1">
                    <div class="row valign-wrapper">
                        <div class="col s2">
                            <img src="${post_data.user_avatar}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
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
}
