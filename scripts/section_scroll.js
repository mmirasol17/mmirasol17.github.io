// ! functionality for scrolling to different sections of the page
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(`a[href^="#"]`).forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        // get the section that the link is pointing to
        const targetSection = document.querySelector(this.getAttribute("href"));
  
        // get the height of the navbar and calculate the offset
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offset = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
  
        // scroll to the section with the offset and smooth behavior
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      });
    });
  });