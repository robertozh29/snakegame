const game = document.getElementById('game');
const ctx = game.getContext("2d")

var snake = [
   {x:0, y: 0}
];

var food = {x: 0, y: 0};
let moveX = 0;
let moveY = 0;

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
    console.log(food)
    console.log(Math.floor(Math.random()*10))
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
    generateFood();
        
    setInterval(() => {
        drawMap();
        drawFood();
        moveSnake();
        drawSnake();

    }, 120);
}

function changeDirection(e){
    var key = e.keyCode;

    switch (key) {
        case 38:
            moveY = -10;
            moveX = 0;
            break;
        case 40:
            moveY = 10;
            moveX = 0;
            break;
        case 37:
            moveX = -10;
            moveY = 0;
            break;
        case 39:
            moveX = 10;
            moveY = 0;
            break;
        default:
            break;
    }
}



main();
document.addEventListener("keydown", changeDirection);



