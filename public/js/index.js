//============================== GLOBAL...
// session object
const Session = {
    init: () => {
        let temp_data = {
            userData: null,
            searchResults: null,
            allCurrentUsers: null,
            lastSearchReq: null,
            selectedTrack: null,
            loggedIn: false,
            searchPerformed: false
        };
        return sessionStorage.setItem('temp_data', JSON.stringify(temp_data));
    },
    // get the current session storage data in object form...
    get: () => {
        // returns an object of the current session storage...
        return JSON.parse(sessionStorage.getItem('temp_data'));
    },
    // pass in a key of the session storage and update its' value...
    set: (x, y) => {
        // get's the current session storage as an object
        let data = Session.get();
        // targets the passed key of the object and set its' value...
        data[`${Object.keys(data).filter(key => key === x ? true : false)}`] = y;
        // replaces current session storage with updated object...
        return sessionStorage.setItem('temp_data', JSON.stringify(data));
    },
    getData: (x) => {
        let data = JSON.parse(sessionStorage.getItem('temp_data'));
        return data[`${Object.keys(data).filter(key => key === x ? true : false)}`];
    }
};

Session.init(); // initializes temporary session storage object...
$('#cm_btn').hide();

//============================== MAIN...

$(document).ready( () => {
    // targets...
    const $submit =         $('#submit');
    const $artist =         $('#artist');
    const $album =          $('#album');
    const $song =           $('#song');

    init();

    //========== LISTENERS...

    $('#log_in').on('click', (event) => {
        event.preventDefault();
        console.log('Signing in...');
        log_in();
        if (Session.getData('searchPerformed')) {
            $('#cm_btn').show();
        }
        
    });

    $('#sign_up').on('click', (event) => {
        event.preventDefault();
        console.log('Processing...');
        register();
        $('#cm_btn').show();
        
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
    let row = event.currentTarget.dataset;
    let selected_data = {
        artists: row.artists,
        song: row.song,
        album: row.album
    };
    Session.set('selectedTrack', selected_data);

    render_comments_by_song(Session.getData('selectedTrack'));
});

// Event delegation for '#comment_submit' modal button...
$(document).on('click', '#comment_submit', (event) => {
    event.preventDefault();
    console.log('Submitting comment...');
    
    let c_post = {
        // UserId: y.data.length + 1,
        user_id: Session.getData('userData').id,
        avatar: Session.getData('userData').user_avatar, 
        album: Session.getData('selectedTrack').album, 
        artist: Session.getData('selectedTrack').artists, 
        song: Session.getData('selectedTrack').song, 
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
                render_comments_by_song(Session.getData('selectedTrack'));
        });
    }
});

//============================== FUNCTIONS...

function render_comments_by_song (x) {
    $.post('/api/posts/', x)
        .then((result) => {
            console.log(result);
            $('#display').empty();
            // load_comment_button(result);
            load_cb_if_logged_in(result);
            
            load_comments(result);
    });
}

function load_cb_if_logged_in (resp) {
    console.log('This is the resp recieved by load_cb_if_logged_in function: ', resp);
    if (resp.meta === null) {
        return;
    }
    else {
        if (Session.getData('userData')) {
            // let x = JSON.parse(sessionStorage.getItem('user_data'));
            render_comment_button();
            // load_comment_button(Session.getData('userData'), resp);
        }
    }
}

function load_user_status (a) {
    if (Session.getData('userData') != null) {
        if (a === undefined) {
            a = Session.getData('userData');
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

    Session.set('userData', dataToKeep);
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
                Session.set('loggedIn', true);
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
                Session.set('loggedIn', true);
                load_user_status();
                render_comment_button();
                // load_comment_button(Session.get('userData'), Session.get('selectedTrack')); // (userData, selectedTrack)
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
        Session.set('searchPerformed', true);
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




function render_comment_button () {
    if (Session.getData('loggedIn') && Session.getData('searchPerformed')) {
        $('#cm_btn').show();
        init();
    }
}

// function load_comment_button (x, y) {
//     // x = userData, y = data.dbPoss...
//     console.log('load comment btn recieved: ', y.data.length);
    

//     // Event delegation for '#comment_submit' modal button...
//     $(document).on('click', '#comment_submit', (event) => {
//         event.preventDefault();
//         console.log(x);
//         console.log('Submitting comment...');
//         console.log(y.data.length++);
//         let c_post = {
//             UserId: y.data.length + 1,
//             user_id: x.id,
//             avatar: x.user_avatar, 
//             album: y.meta.album, 
//             artist: y.meta.artists, 
//             song: y.meta.song, 
//             body: $('#c_body').val(), 
//             rating: $('#c_rating').val()
//         };

//         if (c_post.body === '' 
//             || c_post.body === undefined 
//             || c_post.body === null) {
//             alert(`You can't submit a blank comment.`);
//         }
//         else {
//             // console.log(c_post);
//             $.post('/api/posts/create', c_post)
//                 .then( (result) => {
//                     console.log('Post successful! Posted the following data: ', result);

//                     // function that reloads page with results...
//                         // probably best to do this on the server side with a res.render() using handlebars...
//                     render_comments_by_song(Session.getData('selectedTrack'));
//             });
//         }
//     });
// }

function load_comments (x) {
    console.log('data was sent...');
    let comments = `
        <div class="row" id="comments"></div>
    `;

    // $('#display').append(comment);
    $('#display').append(comments);

    // x.data = dbPosts[]...
    if (x.data) {
        console.log('data was recieved back!');
        console.log(x.data);

        x.data.forEach((post_data) => {
            $.get('/api/users').then( result => {
                // let author = result.filter( (user) => {
                //     user.id === post_data.user_id ? true : false;
                // });
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