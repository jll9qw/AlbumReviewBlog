1. Hack idea for maintaining data between promises.
    - utilize session storage to store JSON data of temp data.
        - sessionStorage.setItem('user_data'); ===> will be used to temporarily store the users account info
        - sessionStorage.setItems('temp_data'); ===> will be an object who's keys will be cleared and overwritten many times throughout the session

        ex:
            let temp_data = {
                searchResults,
                allCurrentUsers,
                lastSearchReq
            };
        *After each route's results are recieved from the server, store them to session the temp_data object.

        