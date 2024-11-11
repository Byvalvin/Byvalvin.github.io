function adjustForScrollbar() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`; // Adjust dynamically based on scrollbar width
    } else {
        document.body.style.paddingRight = '0px';
    }
}
// Run the function on initial page load to handle scrollbar before rendering
window.addEventListener('DOMContentLoaded', adjustForScrollbar);

// Run the function on resize in case the page size or scrollbar presence changes
window.addEventListener('resize', adjustForScrollbar);
