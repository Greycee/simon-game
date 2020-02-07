var buttonCollours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("OUCH! Game Over! <br> Press Any Key to Restart");
    startOver()
  }
};

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  
  var randomChosenColour = buttonCollours[randomNumber];
  
  gamePattern.push(randomChosenColour);
  
  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  level++;

  $("#level-title").text("Level " + level);

  userClickedPattern = [];
};

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}