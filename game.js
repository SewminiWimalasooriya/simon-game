var level = 0;
const buttonColours = ["red", "blue", "green", "yellow"];

const gamePattern = [];

var userClickedPattern =[];

function nextSequence() {
        userClickedPattern =[];//reset patern user for next level
        level++;
        $("#level-title").text("level "+level );
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);
        animatePress(randomChosenColour);
        
}

// $(document).on("keydown", function () {
//   nextSequence(); // Now safe to play sound inside this
// });

// to detect what button was pressed
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  animatePress(userChosenColour);
  // console.log("User clicked:", userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();

}
//add animation yo user click

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed")
  },100);
};

//detected keyboard key pressed
var started = false;
$(document).keypress(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("level "+level );//score level
    started = true;
  }
});

//checked user answer
function checkAnswer(currentLevel){
  console.log("Checking answer at index:", currentLevel);
  console.log("User:", userClickedPattern);
  console.log("Game:", gamePattern);


  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);

    }
  }else{
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over")
    },200);
    
    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

//restart game

function startOver(){
  level = 0;
  gamePattern.length = 0; // clears the array
  started = false;
  

}


