//! use an env variable to set the email service link from formspree

// get the form service link from the env variable
const formServiceLink = process.env.FORMSPREE_LINK;

// get the form element and set the action attribute to the form service link
const form = document.getElementById("contact-form");
form.setAttribute("action", formServiceLink);

console.log("form service link: ", formServiceLink);
