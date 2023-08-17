const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
});

const elementsToAnimate = document.querySelectorAll('.fade-in');
elementsToAnimate.forEach(element => {
  observer.observe(element);
});