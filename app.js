//documents
let searchBar = document.getElementById("search-input");

let fragement = ``;
let topSongsDisplay = document.getElementById('top-songs-display');

let fragement2 = ``;
let newSongsDisplay = document.getElementById('new-songs-display');

//private methods
function fetchToken(){
    const clientId = '1313da49eb5e4a7a9f89e459827954dd';
    const clientSecret = '5ab6fd8453ab4201827cd364a8ca3cb8';
     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    }).then(res=>res.json()).then(rs=> console.log(rs.access_token))
}
const token = fetchToken();
//event listener for search key
searchBar.addEventListener("keyup", (token)=>{
    let spotifyPlayer = document.getElementById("spotify-player");
    if (event.keyCode === 13) {
        scrolldiv();
        fetch(`https://api.spotify.com/v1/search?q=${searchBar.value}&type=track&offset=0&limit=1`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + 'BQAqmEfZON6tOTj8IBd3QVWmE6ySuKdOZc8Z-Kt_ep0NJDJkA3OXLSKiA69JbpZLCpPRcjNfzEywBI5iOrQ'}
        })
        .then(result=>result.json())
        .then(data => {
            console.log(data)
            musicID=data.tracks.items[0].id;
            console.log(musicID);
            spotifyPlayer.innerHTML=`
            <div>
            <iframe src="https://open.spotify.com/embed/track/${musicID}" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>`;
        })
    }
})

// new releases display
function newReleases(token) {
    fetch(`https://api.spotify.com/v1/browse/new-releases?limit=10&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + 'BQAqmEfZON6tOTj8IBd3QVWmE6ySuKdOZc8Z-Kt_ep0NJDJkA3OXLSKiA69JbpZLCpPRcjNfzEywBI5iOrQ'
            }
        })
        .then(result=>result.json()).then(rs=>rs.albums.items).then(
            obj=>{
                for (let names of obj){
                    fragement = `
                    <div class="songs">
                    <img src="${names.images[0].url}" width="256" height="256" alt="" id="song-img" onclick="play('${names.name}')">
                    <p id="song-name" onclick="play('${names.name}')">${names.name}</p>
                    <p id="song-artist">${names.artists[0].name}</p>
                    </div>`;
                    newSongsDisplay.innerHTML+=fragement;
                }
            }
        )
}
function topSongs(token) {
    fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + 'BQAqmEfZON6tOTj8IBd3QVWmE6ySuKdOZc8Z-Kt_ep0NJDJkA3OXLSKiA69JbpZLCpPRcjNfzEywBI5iOrQ'
            }
        })
        .then(result=>result.json()).then(rs=>rs.tracks.items)
        .then(
            obj=>{
                for (let names of obj){
                    fragement = `
                    <div class="songs">
                    <img src="${names.track.album.images[0].url}" width="256" height="256" alt="" id="song-img" onclick="play('${names.track.name}')">
                    <p id="song-name" onclick="play('${names.track.name}')">${names.track.name}</p>
                    <p id="song-artist">${names.track.artists[0].name}</p>
                    </div>`;
                    topSongsDisplay.innerHTML+=fragement;
                }
            }
        )
}

function scrolldiv() {
    var songBar = document.getElementsByClassName("song-bar")[0];
    songBar.scrollIntoView();
}

function play(songName) {
    let spotifyPlayer = document.getElementById("spotify-player");
    scrolldiv();
    console.log(songName)
    fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&offset=0&limit=1`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + 'BQAqmEfZON6tOTj8IBd3QVWmE6ySuKdOZc8Z-Kt_ep0NJDJkA3OXLSKiA69JbpZLCpPRcjNfzEywBI5iOrQ'}
        })
        .then(result=>result.json())
        .then(data => {
            musicID=data.tracks.items[0].id;
            console.log(musicID);
            spotifyPlayer.innerHTML=`
            <div>
            <iframe src="https://open.spotify.com/embed/track/${musicID}" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>`;
        })
}


// onload function
window.onload = () => {
    newReleases(token);
    topSongs(token);
};