$("form").on("submit", function(event) {
  event.preventDefault();

  var iftttKey = "";

  var $iftttKey = $(this).find("#iftttKey");
  iftttKey = $iftttKey.val();

  var url =
    "https://romainducrocq-assignment3.glitch.me/spotifyTrackSaver.html?iftttKey=" +
    iftttKey;

  window.open(url, "_blank");
});
