$(document).ready(function(){
    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 
  })

  /* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("side-menu").className = ("col-md-2");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("side-menu").className = ("col-md-2 hidden-xs");
}
 // отправка формы
 $("#save").click(function (e) {
  e.preventDefault();
  var form = document.forms["contentForm"];
        var id = form.elements["id"].value;
        var title = form.elements["title"].value;
        var context = form.elements["context"].value;
        CreateContent(title, context);
});
// Добавление статьи
    function CreateContent(titleText, contextText) {
        $.ajax({
            url: "api/contents",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                title: titleText,
                context: contextText
            }),
            success: function () {
                reset();
            }
        })
}
// сброс формы
    function reset() {
        var form = document.forms["contentForm"];
        form.reset();
        form.elements["id"].value = 0;
    }