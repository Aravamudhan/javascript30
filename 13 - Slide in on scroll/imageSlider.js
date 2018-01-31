function handleImageSlide() {
    const sliderImages = document.querySelectorAll(".slide-in");
    // If an image comes into view, it has to be shown(or slide-in. An animation effect)
    // If an image goes out of view, it has to be hidden 
    function checkSlide(e) {
        sliderImages.forEach(sliderImage => {
            // The px value at half way through for an image
            const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
            // offsetTop - How far down the top of this component(in this case an image)
            // from the top of the window
            const imageBottom = sliderImage.offsetTop + sliderImage.height;
            // Check if we scrolled past the half of the image
            // If this is true, we have to slide in the image
            const isHalfShown = slideInAt > sliderImage.offsetTop;
            // Check if we have not scrolled past the bottom of the image
            const isNotScrolledPast = window.scrollY < imageBottom;
            if (isHalfShown && isNotScrolledPast) {
                sliderImage.classList.add("active");
            } else {
                sliderImage.classList.remove("active");
            }
        });
    }
    window.addEventListener("scroll", debounce(checkSlide, 10));
}



