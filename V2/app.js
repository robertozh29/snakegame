const game = document.getElementById('game');
const ctx = game.getContext("2d")
const circle = document.getElementsByClassName("circle");
const up = document.getElementById("up")
const down = document.getElementById("down")
const left = document.getElementById("left")
const right = document.getElementById("right")

var snake = [
   {x:0, y: 0}
];

var food = {x: 0, y: 0};
let moveX = 0;
let moveY = 0;
var button = 0;
var status;

function drawMap(){
    for (let y = 0; y < 250; y +=10) {  
        for (let x = 0; x < 250; x +=10) {
            ctx.fillStyle = 'rgb(135, 161, 82)';
            ctx.fillRect(x, y, 10, 10);
        }     
    }
}

function generateFood(){
    var x = 10 * Math.floor(Math.random() * 25);
    var y = 10 * Math.floor(Math.random() * 25 );       
    food = {x: x, y: y};
}

function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.stroke();
}

function drawSnake(){
    snake.forEach(part => {
      ctx.fillStyle = 'black';
      ctx.fillRect(part.x, part.y, 10, 10); 
    });
}

function moveSnake(){

    const head = {x: snake[0].x + moveX, y: snake[0].y + moveY};
    snake.unshift(head)
    snake.pop();

    if(food.x == snake[0].x && food.y == snake[0].y ){
        generateFood();
        var tail = {x: snake[snake.length-1].x + moveX, y: snake[snake.length-1].y + moveY};
        snake.push(tail)
    }
}

function main(){ 
    var time = 140;  

    setInterval(() => {
        if(status == "pause"){
            moveY = 0;
            moveX = 0;
        }else{
            drawMap();
            drawFood();
            moveSnake();
            drawSnake();
        }
    }, time);
}

function changeDirection(e){
    status = "play"
    var key;
    button === 0 ?  key = e.keyCode : key = button;
  
    if((key === 87 || key === 38) && (moveY === 0)){
      moveY = -10;
      moveX = 0;
    } 
    else if((key === 83 || key === 40) && (moveY === 0)){
      moveY = 10;
      moveX = 0;
    }
    else if((key === 65 || key === 37) && (moveX === 0)){
      moveY = 0;
      moveX = -10;
    }
    else if((key === 68 || key === 39) && (moveX === 0)){
      moveY = 0;
      moveX = 10;
    }
    button = 0;
}

generateFood();
main();
document.addEventListener("keydown", changeDirection);

up.onclick= function(){ 
    button = 87;  
    changeDirection()
}
down.onclick = function(){ 
    button = 83;  
    changeDirection()
}
left.onclick= function(){ 
    button = 65;  
    changeDirection()
}
right.onclick = function(){ 
    button = 68;  
    changeDirection()
}

circle[0].onclick = function(){
    status = "pause"
}
circle[1].onclick = function(){
    status = "pause"
}


