// When the video starts coming into view, it should play and when it starts get hidden
// it should pause
function handleVideoPlay() {
    const video = document.querySelector("video");
    function checkVideoInView() {
        // Element.getBoundingClientRect returns a DOMRect object
        // The DOMRect is nothing but a rectangle that has useful positional characterists
        // such as the current position of the element's top/bottom etc
        const videoRectangle = video.getBoundingClientRect();
        // If the top of the video element is less then the 3/4th of view port's height value
        const isShown = (videoRectangle.top < window.innerHeight / 1.5);
        // If the bottom is less then the element's height then the element is getting hidden
        const isHidden = (videoRectangle.bottom < videoRectangle.height / 1.5);
        // If the element's top is less then the 75% of innerHeight and also it is not hidden(i.e.)scrolled
        // outside the top of the window, then the video should be played
        if (isShown && !isHidden) {
            video.play();
        } else {
            video.pause();
        }
    }
    window.addEventListener("scroll", debounce(checkVideoInView, 10));
}
function setupVideoPlayer() {
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');

    progressBar.style.flexBasis = '0%';

    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updateButton() {
        const icon = this.paused ? '►' : '❚❚';
        toggle.textContent = icon;
    }

    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
}