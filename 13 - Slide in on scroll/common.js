// This function is necessary in a case where we might want to restrict number of times
// a function is called. In our case, we want to stop the checkSlide function from
// being called multiple times. The event listener "scroll" will call the 
// checkSlide 100s times for a single scroll from the top to bottom
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}