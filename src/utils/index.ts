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

export function getProjectStatusColor(status: string) {
  switch (status) {
    case "Open Source":
      return "bg-purple-500";
    case "Live Production":
      return "bg-green-500";
    case "Public":
      return "bg-blue-500";
    case "Private/Academic":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
}
