$(document).ready(function(){
    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 
  })

  /* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("side-menu").style.width = "250px";
  document.getElementById("side-menu").className = ("col-md-2");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("side-menu").className = ("col-md-2 hidden-xs");
}