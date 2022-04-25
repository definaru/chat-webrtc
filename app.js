//import isNode from 'detect-node'

const isNode = require('detect-node')
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, 'client')))

const rel = async () => {
    if (!isNode) {
        var constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
        var video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); });
    }  
}


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
    //res.json(data)
})

app.listen(8000, () => console.log('Server started...'))