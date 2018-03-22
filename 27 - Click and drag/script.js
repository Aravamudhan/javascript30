const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;
slider.addEventListener("mousedown",(e)=>{
    isDown = true;
    slider.classList.add("active");
    // The position where we clicked first
    startX = e.pageX - slider.offsetLeft;
    // How much we have scrolled from left since we clicked
    scrollLeft=slider.scrollLeft;
});
slider.addEventListener("mouseleave",()=>{
    isDown = false;
    slider.classList.remove("active");
});
slider.addEventListener("mouseup",()=>{
    isDown = false;
    slider.classList.remove("active");
});
slider.addEventListener("mousemove",(e)=>{
    if(!isDown)
        return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    // From the position where we clicked, how far have we come
    // startX is the place where we clicked 1st, x is the place where we are now.
    // This gives a sliding effect
    const walk = (x-startX)*3;
    // We are scrolling the divs
    slider.scrollLeft = scrollLeft-walk;
});