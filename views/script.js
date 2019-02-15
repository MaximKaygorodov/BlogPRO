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
// Получение одной статьи
function GetContent(id) {
  $.ajax({
      url: "/api/contents/"+id,
      type: "GET",
      contentType: "application/json",
      success: function (content) {
          var form = document.forms["contentForm"];
          form.elements["id"].value = content.id;
          form.elements["title"].value = content.title;
          //form.elements["context"].value = content.context;
          quill.setContents([{ insert: content.context }]);
      }
  });
}
// Добавление статьи
    function CreateContent(titleText, contextText, timeText) {
        $.ajax({
            url: "api/contents",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                title: titleText,
                context: contextText,
                time: timeText
            }),
            success: function () {
                reset();
            }
        })
}
// публикация только что написанной статьи
function PublishContent2(titleText, contextText, timeText) {
  $.ajax({
  url: "aplic/contents",
  contentType: "application/json",
  method: "POST",
  data: JSON.stringify({
      title: titleText,
      context: contextText,
      time: timeText
  }),
  success: function (content) {
    console.log(5);
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
