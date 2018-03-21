function setupNav() {
    const nav = document.querySelector("#main");
    const navOffset = nav.offsetTop;

    function fixNav(e) {
        if (window.scrollY >= navOffset) {
            document.body.style.paddingTop = nav.offsetHeight + "px";
            document.querySelector("body").classList.add("fixed-nav");
        } else {
            document.body.style.paddingTop = 0 + "px";
            document.querySelector("body").classList.remove("fixed-nav");
        }
    }

    window.addEventListener("scroll", fixNav);
}