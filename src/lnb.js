// Toggle the visibility of a dropdown menu
function toggleDropdown(dropdown, menu, isOpen) {
  dropdown.classList.toggle("open", isOpen);
  menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
}

// Close all open dropdowns
function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown_container.open")
    .forEach((openDropdown) => {
      toggleDropdown(
        openDropdown,
        openDropdown.querySelector(".dropdown_menu"),
        false
      );
    });
}

// Attack click event to all dropdown toggles
document.querySelectorAll(".dropdown_toggle").forEach((dropdownToggle) => {
  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();

    // DOM 요소의 메서드, 특정 선택자의 조상 요소를 찾음
    const dropdown = e.target.closest(".dropdown_container");
    const menu = dropdown.querySelector(".dropdown_menu");
    const isOpen = dropdown.classList.contains("open");

    closeAllDropdowns(); // Close all open dropdowns

    // Toggle current dropdown visibility
    toggleDropdown(dropdown, menu, !isOpen);
  });
});

// document.querySelector(".sidebar_toggler").addEventListener("click", () => {
//   closeAllDropdowns();

//   document.querySelector(".sidebar").classList.toggle("collapsed");
// });

// Attack click event to sidebar toggle buttons
document
  .querySelectorAll(".sidebar_toggler, .sidebar_menu_button ")
  .forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns();

      // Toggle collapsed class on sidebar
      document.querySelector(".sidebar").classList.toggle("collapsed");
    });
  });

// Collapsed sidebar by default on small screens
if (window.innerWidth <= 1024)
  document.querySelector(".sidebar").classList.toggle("collapsed");
