let sentiment;

function setup() {
  noCanvas();
  sentiment = ml5.sentiment("movieReviews", modelReady);
}

function modelReady() {
  $("#loading").empty().append($("<p>").attr("class","lead text-primary").text("Model loaded !"));
  $(":submit").removeAttr("disabled");
}

$("#search-form").on("submit", function(event) {
   event.preventDefault();

  var query = "";

  var $query = $(this).find("#search");
  query = $query.val();

  var url =
    "https://twitter.com/search?q=" + query;

  window.open(url, "_blank");
});

$("#analyse-form").on("submit", function(event) {
  event.preventDefault();

  var $text = $(this).find("#tweet-input");
  const text  = $text.val();

  const prediction = sentiment.predict(text);

  const score = Math.trunc(prediction.score*100); 
  
  $("#score")
    .empty()
    .append(
      $("<div>")
        .attr("class", "alert alert-light alert-dismissible fade show")
        .attr("role", "alert")
        .append($("<hr>"))
        .append($("<p>").attr("class","lead").text("Sentiment score: " + score + "%"))
        .append($("<br/>"))
        .append($("<div>").attr("class","progress").attr("style","height:20px;")
                        .append($("<div>").attr("class","progress-bar progress-bar-striped")
                                          .attr("role","progressbar")
                                          .attr("style","width:" + score + "%")
                                          .attr("aria-valuenow",score)
                                          .attr("aria-valuemin","0")
                                          .attr("aria-valuemax","100")
                                          .text(score + "%")))
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
    .append($("<hr>"))
    );
  
  
});

[
  "TODAY WE MAKE AMERICA GREAT AGAIN!",
  "Such a beautiful and important evening! The forgotten man and woman will never be forgotten again. We will all come together as never before",
  "Are you allowed to impeach a president for gross incompetence?",
  "How long did it take your staff of 823 people to think that up--and where are your 33,000 emails that you deleted?",
  "The electoral college is a disaster for a democracy.",
  "Happy New Year to all, including to my many enemies and those who have fought me and lost so badly they just don't know what to do. Love!",
  "Be prepared, there is a small chance that our horrendous leadership could unknowingly lead us into World War III.",
  "The media is spending more time doing a forensic analysis of Melania's speech than the FBI spent on Hillary's emails.",
  "The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.",
  "Fidel Castro is dead!"
].forEach(function(item, index) {
  $("#top" + (index+1).toString()).click(function() {
    $("#tweet-input").val(item);
});
}); 
  



    
    