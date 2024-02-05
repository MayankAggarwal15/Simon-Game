var button_colors = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var user_pattern = [];
var level = 0;
var count = 0;

$(document).on("keypress", function() {
  if (level === 0)
  {
  nextSequence();
  }
});

$(".btn").on("click", function () {
  var button_id = $(this).attr("id");
  user_pattern.push(button_id);

  playSound(button_id);
  buttonAnimation(button_id);

  checkPattern();
});


function nextSequence() {
  user_pattern = [];

  var random_number = Math.floor(Math.random() * button_colors.length);
  var random_color = button_colors[random_number];
  game_pattern.push(random_color);

  level++;
  $("#level-title").text("LEVEL " + level + " : WATCH");

  var i = 0;

  var myInterval = setInterval(function () {
    var random_button = $("div#" + game_pattern[i]);
    playSound(game_pattern[i]);

    random_button.fadeOut(100);
    random_button.fadeIn(100);

    i++;

    if (i === game_pattern.length) {
      clearInterval(myInterval);
    }
  }, 500);

  count++;

  setTimeout(function () {
    $("#level-title").text("LEVEL " + level + " : PLAY");
  }, count * 700);
}

function checkPattern() {
  if (
    user_pattern[user_pattern.length - 1] === game_pattern[user_pattern.length - 1]
  ) {
    if (user_pattern.length === game_pattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("body").addClass("game-over");
  playSound("wrong");
  $("#level-title").text("GAME OVER");

  setTimeout(function () {
    $("body").removeClass("game-over");
    restart();
  }, 1000);

}

function restart() {
  level = 0;
  count = 0;
  user_pattern = [];
  game_pattern = [];

  $("#level-title").text("GAME OVER! Press Any Key to Restart");

}

function playSound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

function buttonAnimation(current_id) {
  var active_button = $("#" + current_id);

  active_button.addClass("pressed");

  setTimeout(function () {
    active_button.removeClass("pressed");
  }, 100);
}


