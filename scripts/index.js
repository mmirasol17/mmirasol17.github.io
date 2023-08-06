// * functionality for highlighting active section in the navbar
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section'); // get all sections
  let activeSectionId = null; // track the ID of the currently active section

  // options for the IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  // create an observer to observe when sections are intersecting
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // get the ID and link of the section that is intersecting
      const targetId = entry.target.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${targetId}"]`);

      if (entry.isIntersecting) {
        if (targetId !== activeSectionId) {
          // remove highlighting from the previously active section
          if (activeSectionId) {
            const activeLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`);
            activeLink.style.textDecoration = 'none';
            activeLink.style.color = '#FFFFFF';
          }
          // highlight the current section
          targetLink.style.textDecoration = 'underline';
          targetLink.style.color = '#60A5FA';
          activeSectionId = targetId; // update active section
        }
      } else {
        // remove highlighting when section is not intersecting
        targetLink.style.textDecoration = 'none';
        targetLink.style.color = '#FFFFFF';
        if (targetId === activeSectionId) {
          activeSectionId = null; // clear active section if no longer intersecting
        }
      }
    });
  }, observerOptions);

  // observe each section for when it is intersecting
  sections.forEach(section => {
    observer.observe(section);
  });
});

// * functionality for scrolling to different sections of the page
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

// * form validation
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


