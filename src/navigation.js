const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.getAttribute("href") === activePage) {
    const basicIcon = link.querySelector(".basic_icon");
    const activeIcon = link.querySelector(".active_icon");
    basicIcon.style.display = "none";
    activeIcon.style.display = "block";

    link.classList.add("active");
  }
});
