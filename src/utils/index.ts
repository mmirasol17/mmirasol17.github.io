export function handleScrollToElementById(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const navbar = document.querySelector(".navbar");
    const offset = navbar ? navbar.clientHeight : 64;
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  }
}
