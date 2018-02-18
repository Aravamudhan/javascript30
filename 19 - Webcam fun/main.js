const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const stopStream = document.querySelector('#stop-stream');
const muteStream = document.querySelector('#mute-stream');
const controls = document.querySelector('.controls');
// This is for adding effects to the canvas
const inputs = document.querySelectorAll('.effects input');
let effects = {
    red: 0,
    green: 0,
    blue: 0
};

function startVideo() {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
            stopVideoListener(localMediaStream);
            muteVideoListener(localMediaStream);
        })
        .catch(err => {
            console.log("Something happened when trying to stream video", err.message);
        });
}

function stopVideoListener(stream) {
    stopStream.addEventListener("click", function (e) {
        stream.getVideoTracks()[0].stop();
        controls.textContent = "Streaming has stopped. Reload the page to start again";
    });
}

function muteVideoListener(stream) {
    muteStream.addEventListener("click", function (e) {
        let videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack.enabled) {
            videoTrack.enabled = true;
            this.textContent = "Pause streaming"
            console.log('Resuming');
        } else {
            videoTrack.enabled = false;
            this.textContent = "Resume streaming"
            console.log('Pausing');
        }

    });
}
// We have a canvas element named 'canvas' with class=photo
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    // For every 200ms, an image is drawn into the canvas from the source 'video' and
    // gets drawn. The width and height of the original image is necessary. Using those
    // measurements, the image that is drawn into canvas is scaled
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // To add effects we need to get the pixels. The getImageData returns the
        // information about each pixel with in the area and dimensions specified.
        // Here we start at the position (0,0) with a specific width and height
        // This getImageData function returns an object with a special kind of array
        //  with all the pixels in the given area. They will be an RGB value
        // Extracts pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // debugger; By using this keyword we are entering into the debuggin mode
        if (effects) {
            pixels = effect(pixels);
        }
        // else {
        //     pixels = rgbSplit(pixels);
        // }
        // Put the pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 200);
}
// Takes a photo on clicking the button Take photo
function takePhoto() {
    // Create a download link by converting whatever is being projected in the canvas
    // This create a image
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "photo");
    link.textContent = "Download Image";
    // Set the created image in the link tag, so that it can be downloaded on click
    link.innerHTML = `<img src="${data}" alt="Photo taken"/>`;
    strip.insertBefore(link, strip.firstChild);
    // Play the 'shutter open/close' sound of taking a photo
    snap.currentTime = 0;
    snap.play();
}

// Add the red, green and blue effects to the canvas image
function effect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + (effects.red != 0 ? effects.red : 0); // Red
        pixels.data[i + 1] = pixels.data[i + 1] + (effects.green != 0 ? effects.green : 0); // Green
        pixels.data[i + 2] = pixels.data[i + 2] + (effects.blue != 0 ? effects.blue : 0); // Blue
    }
    return pixels;
}
// This is just for playing with the image
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] + 100; // Red
        pixels.data[i + 100] = pixels.data[i + 1] - 50; // Green
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function handleUpdate(e) {
    effects[this.name] = this.value;
}

startVideo();
// When a video is ready to be played, the canplay event is fired
// When the canplay even is fired, we call the paintToCanvas function
video.addEventListener('canplay', paintToCanvas);
inputs.forEach(function (input) {
    input.addEventListener('change', handleUpdate)
});