var constraints = { audio: true, video: { width: 800, height: 450 } };
var pause = document.getElementsByClassName('playing');
let videoElem = document.querySelector('video');
let playButton = document.getElementById("playbutton");
let stopMicrophone = document.getElementById("stop_microphone");
let stopVideo = document.getElementById("stop_video");

playButton.addEventListener("click", handlePlayButton, false);
// stopMicrophone.addEventListener("click", stopAudioOnly, false);
// stopVideo.addEventListener("click", stopVideoOnly, false);  

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
    var video = document.querySelector('video');
    video.srcObject = mediaStream;

    video.onloadedmetadata = function(e) {
        video.play();
        console.log('Stream:', e);
    };
    
})
.catch(function(err) { console.log(err.name + ": " + err.message); });

playVideo();

async function playVideo() {
    try {
        await videoElem.play();
        //stopMicrophone.addEventListener("click", stopAudioOnly(videoElem), false);
        playButton.classList.add("playing");
        playButton.innerHTML = 'pause';
    } catch(err) {
        playButton.classList.remove("playing");
    }
}

function handlePlayButton() {
  if (videoElem.paused) {
    playVideo();
  } else {
    videoElem.pause();
    playButton.classList.remove("playing");
    playButton.innerHTML = 'play';
  }
}

function stopVideoOnly(stream) {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

function stopAudioOnly(stream) {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'audio') {
            track.stop();
        }
    });
}