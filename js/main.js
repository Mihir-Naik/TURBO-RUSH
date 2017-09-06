$(function(){

// Variables
var $start = $('#start')
var $score = $('#score')
var $container = $('#container')
var $car = $('#car')
var $orange = $('#orange')
var $white = $('#white')
var $purple = $('#purple')
var $line1 = $('#line1')
var $line2 = $('#line2')
var $line3 = $('#line3')
var $line4 = $('#line4')
var $line5 = $('#line5')
var $line6 = $('#line6')
var $line7 = $('#line7')
var $line8 = $('#line8')
var $line9 = $('#line9')

var gameOver = false
var goLeft = false
var goRight = false
var goUp = false
var goDown = false
var speed = 5
var carSpeed = 2
var score = 1
// KeyDown Event

$(document).on('keydown', function(e){
    var key = e.keyCode;
    if (key === 37 && goLeft === false) {
        goLeft = requestAnimationFrame(left);
    } else if (key === 39 && goRight === false) {
        goRight = requestAnimationFrame(right);
    } else if (key === 38 && goUp === false){
        goUp = requestAnimationFrame(up);
    } else if (key === 40 && goDown === false) {
        goDown = requestAnimationFrame(down)
    }
})

// KeyUp Event

$(document).on('keyup', function(e){
    var key = e.keyCode;
    if (key === 37){
        cancelAnimationFrame(goLeft)
        goLeft = false;
    } else if (key === 39){
        cancelAnimationFrame(goRight)
        goRight = false;
    } else if (key === 38){
        cancelAnimationFrame(goUp)
        goUp = false 
    } else if (key === 40){
        cancelAnimationFrame(goDown)
        goDown = false
    }
})

// Functions 

// To move left
function left() {
    if (gameOver === false && parseInt($car.css('left'))>5) {
    $car.css('left', parseInt($car.css('left')) - 5);
    goLeft = requestAnimationFrame(left);
    }
}
// To move right
function right() {
    if ((gameOver === false) && (parseInt($car.css('left')) < $container.width() - $car.width() - 5)){
    $car.css('left', parseInt($car.css('left')) + 5);
    goRight = requestAnimationFrame(right);
    }
}
// To move up
function up() {
    if (gameOver === false && parseInt($car.css('top')) > 0) {
    $car.css('top', parseInt($car.css('top')) - 5);
    goUp = requestAnimationFrame(up);
    }
}
// To move down
function down() {
    if (gameOver === false && parseInt($car.css('top')) < $container.height() - $car.height() - 10) {
    $car.css('top', parseInt($car.css('top')) + 5);
    goDown = requestAnimationFrame(down);
    }
}

// Start the race using start button
$start.on('click', function() {
animation = requestAnimationFrame(gameOn)
function gameOn(){
    setInterval(function(){
        score++
        $score.text('Score: ' + Math.floor(score/1000))
    }, 500)
    rollDownLine($line1)
    rollDownLine($line2)
    rollDownLine($line3)
    rollDownLine($line4)
    rollDownLine($line5)
    rollDownLine($line6)
    rollDownLine($line7)
    rollDownLine($line8)
    rollDownLine($line9)
    moveOpCar($orange)
    moveOpCar($white)
    moveOpCar($purple)

    animation = requestAnimationFrame(gameOn)
}
})

// Line keeps rolling down continously
function rollDownLine(line) {
    var lineCurrentTop = parseInt(line.css('top'))
    if (lineCurrentTop > parseInt($container.height())){
        lineCurrentTop = -100
    }
    line.css('top', lineCurrentTop + speed)
}
//  Opponent cars roll down randomnly
function moveOpCar(car){
    var carCurrentTop = parseInt(car.css('top'))
    if (carCurrentTop > $container.height()) {
    carCurrentTop = -30
    var carLeft = parseInt(getRandomInt(($car.width() - 30), ($container.width()-$car.width())))
    car.css('left', carLeft)
    }
    car.css('top', carCurrentTop + carSpeed)
}
// Function to create ranndom number for opponent car's 'Left' position
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// setInterval(opCar, 3000)
// function opCar() {
//     this.html = $('<div>').addClass('cars')
//     $container.append(this.html)
//     (this.html).css({'left': '150px', 'background': 'yellow'})
// }
// someCar = new opCar()
// console.log(someCar)

// End
});
