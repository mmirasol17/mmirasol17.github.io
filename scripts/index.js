// * functionality for scrolling to different sections of the page
document.querySelectorAll(`a[href^="#"]`).forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // scroll to the top of the section with a 100px offset
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
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


