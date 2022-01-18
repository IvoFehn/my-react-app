let usersToken;
const clientID = "XXX";
const redirectedURL = "http://localhost:3000";

const Spotify = {
    getAccessToken(){
        if(usersToken){
            return usersToken;
        }

        // check for an access token match
        const usersTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(usersTokenMatch && expiresInMatch){
            usersToken = usersTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // Clearing the parameters
            window.setTimeout(() => usersToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return usersToken;
        } else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectedURL}`
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(searchURL, {headers: {Authorization: `Bearer ${accessToken}`}}
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => (
                {id: track.id, 
                name: track.name, 
                artist: track.artist, 
                album: track.album, 
                uri: track.uri 
                }
                ))
        });
    },

    savePlaylist(nameOfPlaylist, arrayOfTrackURIs){
        if(!nameOfPlaylist || !arrayOfTrackURIs){
            return;
        }

        const accessToken =  Spotify.getAccessToken();
        const headerVar = {Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {headers: headerVar}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers: headerVar,
                method: "POST",
                body: JSON.stringify({name:nameOfPlaylist})
            })}).then(response => response.json
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, 
                    {headers: headerVar,
                    method: "POST",
                    body: JSON.stringify({uris: arrayOfTrackURIs})})
                })
    }
} 

export default Spotify;

