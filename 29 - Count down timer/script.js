let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("button.timer__button");
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeleft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeleft(secondsLeft);
  }, 1000);
}
function displayTimeleft(totalTime) {
  let hours = Math.floor(totalTime / 3600);
  let secondsLeft = Math.floor(totalTime % 3600);
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = Math.floor(secondsLeft % 60);
  timerDisplay.textContent = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
}
function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const minute = end.getMinutes();
  const second = end.getSeconds();
  endTime.textContent = `Ends at ${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
}
function handleButton(e) {
  timer(this.dataset.time);
}
buttons.forEach(button => button.addEventListener("click", handleButton));
// If there is a form with a name(customForm in our case), we can simply call that by document.customForm
document.customForm.addEventListener("submit", function(e) {
  // Stop reload of the page
  e.preventDefault();
  // We are getting the value of an element with the name being "minutes"
  // Since 'this' refers to a form, we can get its child elements through their names
  const min = this.minutes.value;
  this.reset();
  timer(min * 60);
});
