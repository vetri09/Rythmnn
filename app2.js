let apikey = '99739a7068f25c0ef6c0219e417d7384';

fetch('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao&apikey=99739a7068f25c0ef6c0219e417d7384',{
     mode: 'no-cors' ,
})
.then(result=>result.json())
.then(re=>console.log(re))









// let lyrics = document.getElementById('lyrics');

// fetch("https://genius.p.rapidapi.com/artists/16775", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "genius.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
// let geniusToken = 'xwI-W6mXdeGtG_O_VFrE-pvrhh2JKArHl-KnAciEV2Ty6QeQSAhwm4zjfkRHlsSI';