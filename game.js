const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(".btn").click(buttonClickedHandler);
$(document).keypress(keyPressHandler);

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to restart");
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    updateHeading(level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animateButton(randomChosenColor);
}

function animatePress(color) {
    $("."+color).addClass("pressed");
    setTimeout(function () {
        $("."+color).removeClass("pressed");
    }, 100);
}

function makeSound(color) {
    new Audio("sounds/"+color+".mp3").play();
}

function animateButton(color) {
    makeSound(color);
    $("."+color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function buttonClickedHandler(){
    let userChosenColor = this.id;
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}

function keyPressHandler(){
    startOver();
    updateHeading(level);
    if(level === 0){
        nextSequence();
    }
}

function updateHeading(level){
    $("h1").text("Level " + level);
}

function startOver() {
    if(level !== 0){
        level = 0;
        gamePattern = [];
        if($("body").hasClass("game-over")){
            $("body").removeClass("game-over");
        }
    }
}
