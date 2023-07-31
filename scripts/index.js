// * functionality for scrolling to different sections of the page
document.querySelectorAll(`a[href^="#"]`).forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // scroll to the top of the section with a 100px offset
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      top: 100,
    });
  });
});
