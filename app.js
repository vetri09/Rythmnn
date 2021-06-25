//documents
let searchBar = document.getElementById("search-input");

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
    }).then(res=>res.json()).then(rs=>{return rs.access_token})
}
let token = fetchToken();
//event listeners
searchBar.addEventListener("keyup", (token)=>{
    let songName = document.getElementById("song-name");
    let artistName = document.getElementById("song-artist");
    let musicImage = document.getElementById("music-player-img");
    let spotifyPlayer = document.getElementById("spotify-player");
    if (event.keyCode === 13) {
        fetch(`https://api.spotify.com/v1/search?q=${searchBar.value}&type=track&offset=0&limit=1`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
        .then(result=>result.json())
        .then(data => {
            console.log(data);
            songName.innerText=data.tracks.items[0].name;
            artistName.innerText=data.tracks.items[0].artists[0].name;
            musicImage.src=data.tracks.items[0].album.images[0].url;
            musicID=data.tracks.items[0].id;
            spotifyPlayer.innerHTML=`
            <div>
            <iframe src="https://open.spotify.com/embed/track/${musicID}" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>`;
        })
    }
})