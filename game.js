let gamePattern = [];
let userChosenPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;


$(document).on("keydown",function(){
  if(!started)
  {
    nextSequence();
    started=true;
    $("#level-title").text("Level "+level);
  }
  
});
function nextSequence() {
  level++;
  userChosenPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function () {
  let chosenColor = $(this).attr("id");
  userChosenPattern.push(chosenColor);
  animatePress(chosenColor)
  playSound(chosenColor);
  checkAnswer(userChosenPattern.length-1);
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
      $("#"+name).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
  if (userChosenPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userChosenPattern.length === gamePattern.length)
    {
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    startOver();
  }
}
function startOver(){
  level = 1;
  started = false;
  gamePattern = [];
}