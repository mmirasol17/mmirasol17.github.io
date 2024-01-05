// ! functionality for highlighting active section in the navbar
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // 0.5 means that the section is 50% visible
  };

  // create an observer to observe when sections are intersecting
  const observer = new IntersectionObserver((entries) => {
    let topSection = null;

    // loop through all the sections
    entries.forEach((entry) => {
      // Exclude the intro section from being considered for highlighting
      if (entry.target.id !== "intro") {
        // if the section is intersecting and is the topmost section, set it as the top section
        if (entry.isIntersecting && (!topSection || entry.boundingClientRect.y < topSection.boundingClientRect.y)) {
          topSection = entry;
        }
      }
    });

    // if there is a top section, highlight the link in the navbar
    if (topSection) {
      const topLinkId = topSection.target.getAttribute("id");
      const topLink = document.querySelector(`.navbar-link[href="#${topLinkId}"]`);
      if (topLink) {
        // Add a check here
        highlightLink(topLink);
      }
    }
  }, observerOptions);

  // observe all the sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // helper function to highlight the link in the navbar
  function highlightLink(link) {
    // remove underline and change color of all links so new link can be highlighted
    navbarLinks.forEach((navLink) => {
      navLink.style.textDecoration = "none";
      navLink.style.color = "#FFFFFF";
    });
    // highlight the link by underlining it and changing the color
    link.style.textDecoration = "underline";
    link.style.color = "#60A5FA";
  }

  // add event listener to window to highlight the link in the navbar when scrolling
  window.addEventListener("scroll", function () {
    let closestSection = null;
    let closestDistance = Infinity;

    // loop through all the sections and find the closest section to the top of the page
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height; // Get the height of the section
      const distance = Math.abs(rect.top) - sectionHeight / 2; // Adjusted distance calculation
      // if distance is less than closest distance, set closest section to current section
      if (distance < closestDistance) {
        closestDistance = distance - 400;
        closestSection = section;
      }
    });

    // if the user scrolls to the top of the page, unhighlight all links
    if (closestSection && (closestSection.id === "intro" || closestSection.id === "fact")) {
      navbarLinks.forEach((navLink) => {
        navLink.style.textDecoration = "none";
        navLink.style.color = "#FFFFFF";
      });
    } else if (closestSection && closestSection.id !== "intro" && closestSection.id !== "fact") {
      const closestLinkId = closestSection.getAttribute("id");
      const closestLink = document.querySelector(`.navbar-link[href="#${closestLinkId}"]`);
      highlightLink(closestLink);
    }
  });
});
