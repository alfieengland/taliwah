function afterPageLoads() {
  var logoText = document.getElementById('logo-text');

  setTimeout(() => {
    logoText.style.opacity = "1";
  },700)
}

/* Runs the function after the page has fully loaded */
document.addEventListener('DOMContentLoaded', afterPageLoads);
