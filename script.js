function afterPageLoads() {
  var logoText = document.getElementById('logo-text');

  setTimeout(() => {
    logoText.style.opacity = "1";
  },1500)

  var logoText = document.getElementById('logo-text');
  var rowTop = document.getElementById('row-top');
  var rowMiddle = document.getElementById('row-middle');
  var rowBottom = document.getElementById('row-bottom');
  var canvas = document.getElementById('canvas');

  setTimeout(() => {
    rowTop.style.height = "20vh";
    rowMiddle.style.height = "60vh";
    rowBottom.style.height = "20vh";
    canvas.style.height = "60vh";
  },1400)
}

/* Runs the function after the page has fully loaded */
document.addEventListener('DOMContentLoaded', afterPageLoads);
