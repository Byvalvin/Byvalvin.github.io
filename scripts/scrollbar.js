function adjustForScrollbar() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`; // Adjust dynamically based on scrollbar width
    } else {
        document.body.style.paddingRight = '0px';
    }
}
// Adjust on page load
window.addEventListener('load', adjustForScrollbar);

// Adjust on resize (in case the page size changes or the scrollbar appears/disappears)
window.addEventListener('resize', adjustForScrollbar);
