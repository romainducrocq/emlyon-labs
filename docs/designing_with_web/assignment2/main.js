// parameters Object for our query
var parameters = {
  api: 0,
  maxPokemon: 151,
  maxBlackMirrorEpisode: 21,
  maxRoleInGovernment: 157,
  maxNobelPrize: 120
};

var api = ["pokemon", "blackMirrorEpisode", "roleInGovernment", "nobelPrize"];

function getRandomInt(max) {
  return Math.floor(1 + Math.random() * Math.floor(max - 1));
}

var jsonURL = {
  pokemon:
    "https://pokeapi.co/api/v2/pokemon/" +
    getRandomInt(parameters.maxPokemon).toString(),
  blackMirrorEpisode:
    "https://romainducrocq-assignment2.glitch.me/blackmirror.json",
  roleInGovernment:
    "https://data.parliament.scot/api/governmentroles/" +
    getRandomInt(parameters.maxRoleInGovernment).toString(),
  nobelPrize: "https://romainducrocq-assignment2.glitch.me/nobel.json"
};

function myCallback(json) {
  console.log(json);

  switch (api[parameters.api]) {
    case "pokemon":
      var pokemonName = $("#pokemonName");
      var pokemonImg = $("#pokemonImg");

      var namePokemon = $("<p>");
      namePokemon.text(json.name);
      pokemonName.empty().append(namePokemon);

      var spritePokemon = $("<img>");
      spritePokemon.attr("src", json.sprites.front_default);
      pokemonImg.empty().append(spritePokemon);

      jsonURL.pokemon =
        "https://pokeapi.co/api/v2/pokemon/" +
        getRandomInt(parameters.maxPokemon).toString();
      break;

    case "blackMirrorEpisode":
      var blackMirrorEpisode = $("#blackMirrorEpisode");
      var randomBlackMirrorEpisode = getRandomInt(parameters.maxBlackMirrorEpisode - 1);

      var episodeBlackMirror = $("<p>");
      episodeBlackMirror.text(
        "S" +
          json.episodes[randomBlackMirrorEpisode]
            .season +
          "E" +
          json.episodes[randomBlackMirrorEpisode]
            .number +
          ": " +
          json.episodes[randomBlackMirrorEpisode].name
      );
      blackMirrorEpisode.empty().append(episodeBlackMirror);

      var summaryBlackMirror = $("<p>");
      summaryBlackMirror.text(
        json.episodes[randomBlackMirrorEpisode]
          .summary
      );
      blackMirrorEpisode.append(summaryBlackMirror);

      break;

    case "roleInGovernment":
      var roleInGovernment = $("#roleInGovernment");

      var nameroleInGovernment = $("<p>");
      nameroleInGovernment.text(json.Name);
      roleInGovernment.empty().append(nameroleInGovernment);

      jsonURL.roleInGovernment =
        "https://data.parliament.scot/api/governmentroles/" +
        getRandomInt(parameters.maxRoleInGovernment).toString();

      break;

    case "nobelPrize":
      var nobelPrize = $("#nobelPrize");
      var randomNobelPrize = getRandomInt(parameters.maxNobelPrize - 1);

      var categoryNobelPrize = $("<p>");
      categoryNobelPrize.text(
        json.prizes[randomNobelPrize].category
      );
      nobelPrize.empty().append(categoryNobelPrize);

      var motivationNobelPrize = $("<p>");
      motivationNobelPrize.text(json.prizes[randomNobelPrize].laureates[0]
          .motivation
      );
      nobelPrize.append(motivationNobelPrize);

      break;

    default:
      break;
  }
  parameters.api++;
}

async function getAllJson() {
  $("#titleBlackMirror")
    .empty()
    .append("Favourite Black Mirror episode");
  $("#titleRoleInGovernment")
    .empty()
    .append("Role in government");
  $("#titleNobelPrize")
    .empty()
    .append("Last nobel prize");
  await $.getJSON(jsonURL.pokemon, myCallback);
  await $.getJSON(jsonURL.blackMirrorEpisode, myCallback);
  await $.getJSON(jsonURL.roleInGovernment, myCallback);
  await $.getJSON(jsonURL.nobelPrize, myCallback);

  parameters.api = 0;
}

function randomize() {
  getAllJson();
}
