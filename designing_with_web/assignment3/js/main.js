$("form").on("submit", function(event) {
  event.preventDefault();

  var iftttKey = "";

  var $iftttKey = $(this).find("#iftttKey");
  iftttKey = $iftttKey.val();

  var url =
    "spotifyTrackSaver.html?iftttKey=" +
    iftttKey;

  window.open(url, "_blank");
});
