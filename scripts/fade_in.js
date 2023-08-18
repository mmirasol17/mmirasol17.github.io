// ! observe viewed elements and add class to fade them in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
});

// ! get all elements with class fade-in and add them to the observer
const elementsToAnimate = document.querySelectorAll('.fade-in');
elementsToAnimate.forEach(element => {
  observer.observe(element);
});