// console.log('This is working...');
$(document).ready( () => {
    // targets...
    const $submit =         $('#submit');
    const $artist =         $('#artist');
    const $album =          $('#album');
    const $song =           $('#song');

    $submit.on('click', (event) => {
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
                .then( function() {
                    let url = `/api/spotify/artists/${user_input.input}`;
                    location.assign(url);
                })
                ;
                    // .then( (result) => {
                    //     result.forEach(song => {
                    //         $('#display').append(`<p>${song.name}</p>`);
                    //     });
                // });
                break;
            case 'album':
                $.get(`/api/spotify/albums/${user_input.input}`).then();
                break;
            case 'song':
                $.get(`/api/spotify/songs/${user_input.input}`).then();
                break;
        }

        }
}
