const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector("nav");

function handleEnter() {
    this.classList.add("trigger-enter");
    setTimeout(() =>
        this.classList.contains("trigger-enter") && this.classList.add("trigger-enter-active"), 150);
    background.classList.add("open");
    let dropdown = this.querySelector(".dropdown");
    const dropdownCoord = dropdown.getBoundingClientRect();
    const navCoord = nav.getBoundingClientRect();
    const coords = {
        width: dropdownCoord.width,
        height: dropdownCoord.height,
        top: dropdownCoord.top - navCoord.top,
        left: dropdownCoord.left - navCoord.left
    };
    // coords.top - We calculate how far the dropdown is from the top of the window and subtract that
    // with how far the nav bar is from the window. This gives the correct px value of the dropdown from
    // the top of the nav bar
    background.style.width = `${coords.width}px`;
    background.style.height = `${coords.height}px`;
    background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    // background.style.transform = `translate(${0}px, ${0}px)`;
}

function handleLeave() {
    this.classList.remove("trigger-enter", "trigger-enter-active");
    background.classList.remove("open");
}

triggers.forEach(trigger => trigger.addEventListener("mouseenter", handleEnter));
triggers.forEach(trigger => trigger.addEventListener("mouseleave", handleLeave));