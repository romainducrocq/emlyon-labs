var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};

$("form").on("submit", function(event) {
  event.preventDefault();

  var IFTTT_KEY = getUrlParameter("iftttKey"); //ifttt key
  var EVENT_NAME = "spotify_track_saver";

  var url =
    "https://maker.ifttt.com/trigger/" + EVENT_NAME + "/with/key/" + IFTTT_KEY;

  var data = {
    value1: "",
    value2: ""
  };

  var $song = $(this).find("#song-input");
  data.value1 = $song.val();

  var $artist = $(this).find("#artist-input");
  data.value2 = $artist.val();

  $("#alert")
    .empty()
    .append(
      $("<div>")
        .attr("class", "alert alert-success alert-dismissible fade show")
        .attr("role", "alert")
        .append($("<strong>").text("Saved!"))
        .append($("<br/>"))
        .append($("<span>").text("Song: " + data.value1))
        .append($("<br/>"))
        .append($("<span>").text("Artist: " + data.value2))
        .append(
          $("<button>")
            .attr("type", "button")
            .attr("class", "close")
            .attr("data-dismiss", "alert")
            .attr("aria-label", "Close")
            .append(
              $("<span>")
                .attr("aria-hidden", "true")
                .html("&times;")
            )
        )
    );

  $.get({
    url: url,
    data: data,
    dataType: "jsonp"
  });
});
