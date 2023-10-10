$(document).ready(function () {
  var $row = $(".submit-row").closest(".row");

  $row
    .find("p:not(.deletelink-box)")
    .text(
      "Are you sure you want to select this employee as Employee of the Month?"
    );
  $row.css({
    display: "flex",
    "flex-direction": "column",
  });
});
