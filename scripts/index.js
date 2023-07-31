// * functionality for scrolling to different sections of the page
document.querySelectorAll(`a[href^="#"]`).forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // scroll to the top of the section with a 100px offset
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
});

// * functionality for when email form is submitted
const form = document.querySelector("form");
const email = document.querySelector("#email");
const error = document.querySelector(".error");
const success = document.querySelector(".success");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // check if email is valid
  if (!validateEmail(email.value)) {
    error.classList.add("show");
    email.classList.add("error");
  } else {
    error.classList.remove("show");
    email.classList.remove("error");
    success.classList.add("show");
  }
}
);