// ! functionality for highlighting active section in the navbar
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const navbarLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // 0.5 means that the section is 50% visible
  };

  // create an observer to observe when sections are intersecting
  const observer = new IntersectionObserver(entries => {
    let topSection = null;

    // loop through all the sections
    entries.forEach(entry => {
      // Exclude the intro section from being considered for highlighting
      if (entry.target.id !== 'intro') {
        // if the section is intersecting and is the topmost section, set it as the top section
        if (entry.isIntersecting && (!topSection || entry.boundingClientRect.y < topSection.boundingClientRect.y)) {
          topSection = entry;
        }
      }
    });

    // if there is a top section, highlight the link in the navbar
    if (topSection) {
      const topLinkId = topSection.target.getAttribute('id');
      const topLink = document.querySelector(`.nav-link[href="#${topLinkId}"]`);
      if (topLink) { // Add a check here
        highlightLink(topLink);
      }
    }
  }, observerOptions);

  // observe all the sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // helper function to highlight the link in the navbar
  function highlightLink(link) {
    // remove underline and change color of all links so new link can be highlighted
    navbarLinks.forEach(navLink => {
      navLink.style.textDecoration = 'none';
      navLink.style.color = '#FFFFFF';
    });
    // highlight the link by underlining it and changing the color
    link.style.textDecoration = 'underline';
    link.style.color = '#60A5FA';
  }

  // add event listener to window to highlight the link in the navbar when scrolling
  window.addEventListener('scroll', function () {
    let closestSection = null;
    let closestDistance = Infinity;

    // loop through all the sections and find the closest section to the top of the page
    sections.forEach(section => {
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
    if (closestSection && (closestSection.id === 'intro' || closestSection.id === 'fact')) {
      navbarLinks.forEach(navLink => {
        navLink.style.textDecoration = 'none';
        navLink.style.color = '#FFFFFF';
      });
    } else if (closestSection && closestSection.id !== 'intro' && closestSection.id !== 'fact') {
      const closestLinkId = closestSection.getAttribute('id');
      const closestLink = document.querySelector(`.nav-link[href="#${closestLinkId}"]`);
      highlightLink(closestLink);
    } 
  });
});

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

// ! form validation
document.addEventListener('DOMContentLoaded', function () {
  // get the form and input elements from their ids
  const form = document.querySelector('#contact-form');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');

  // add event listener to form when it is submitted
  form.addEventListener('submit', function (event) {
    let valid = true;

    // check if name is valid (not empty)
    if (nameInput.value.trim() === '') {
      valid = false;
      showError(nameInput, 'Name field cannot be empty');
    } else {
      hideError(nameInput);
    }
    // check if email is valid (not empty and has @ symbol)
    if (!isValidEmail(emailInput.value)) {
      valid = false;
      showError(emailInput, 'Invalid email address');
    } else {
      hideError(emailInput);
    }
    // check if message is valid (not empty)
    if (messageInput.value.trim() === '') {
      valid = false;
      showError(messageInput, 'Message field cannot be empty');
    } else {
      hideError(messageInput);
    }
  // prevent form from submitting if any of the fields are invalid
    if (!valid) {
      event.preventDefault();
    }
  });

  // add event listeners to hide errors on input change
  nameInput.addEventListener('input', function () {
    hideError(nameInput);
  });
  emailInput.addEventListener('input', function () {
    hideError(emailInput);
  });
  messageInput.addEventListener('input', function () {
    hideError(messageInput);
  });

  // helper function to check if email is valid
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // helper functions to show and hide error messages
  function showError(inputElement, errorMessage) {
    inputElement.classList.add('error');

    // check if an error message already exists
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (!existingError) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      inputElement.parentNode.appendChild(errorDiv);
    }
  }

  // hide error message if input is valid
  function hideError(inputElement) {
    inputElement.classList.remove('error');

    const errorDiv = inputElement.parentNode.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // add styles to the form input fields and error messages below the fields
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .error {
      border: 2px solid red;
      background-color: #FEE2E2;

    }
    .error-message {
      color: red;
      font-style: italic;
      margin-top: 4px;
    }
  `;
  document.head.appendChild(styleElement);
});
