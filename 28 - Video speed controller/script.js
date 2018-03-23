const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");
// minimum playbackRate
const min = 0.4;
// maximum playbackRate
const max = 4;
speed.addEventListener("mousemove",function(e){
    // pageY - How the current event has happened in the y axis of the page
    // offsetTop - The distance from the top of the page to the top of the element
    let y = e.pageY - this.offsetTop;
    // Convert the pageY of speed-bar relative to a percentage in the parent block of speed-bar
    let percentage = y/this.offsetHeight;
    const height = Math.round(percentage*100)+"%";
    // To get a value between a minimum value and maximum value using an existing value this is the formula
    // existingValue * (max-min) + min
    const playbackRate = percentage * (max-min) + min;
    bar.style.height=height;
    bar.textContent=playbackRate.toFixed(2)+"X";// Setting 1X 1.5X etc
    video.playbackRate=playbackRate;
});