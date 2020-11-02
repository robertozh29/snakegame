const snakeGame = document.getElementById("snakeGame");
const board_score = document.getElementById("board_score");
const start_message = document.getElementById("startMessage");
const buttons = document.getElementsByTagName("button");

ctx = snakeGame.getContext("2d");

var snake = [
  {x:150 , y:150},
  {x:160 , y:150},
  {x:170 , y:150}
];

var food = {x: 0, y: 0};
var score = 0;
var moveX = 0;
var moveY = 0;

var button = 0;

var gameOver = false;


//Funcion que crea las partes de la serpiente
function snakePart(x,y) {
  ctx.fillStyle = 'lightgreen';
  ctx.strokestyle = 'darkgren';
  ctx.fillRect(x, y, 10, 10);
  ctx.strokeRect(x, y, 10, 10); 
}

//Funcion para dibujar toda la serpiente
function drawSnake(){
  snake.forEach(part => {
    snakePart(part.x,part.y);
  });
}

//Cambia de posicion a la serpiente
function mover(){
  const head = {x: snake[0].x + moveX, y: snake[0].y - moveY};
  snake.unshift(head)
  snake.pop();

  //Verificando si comio
  if(head.x === food.x && head.y === food.y){
    genFood()
    var tail = {x: snake[snake.length-1].x + moveX, y: snake[snake.length-1].y - moveY};
    snake.push(tail)
    score += 10;
  }

  //Verificando si la serpiente toco un borde 
  if(head.x === -10 || head.y === -10){
    alert("Perdiste");
    gameOver = true;
  } 
  else if ((head.x === 300 || head.y === 300)){
    alert("Perdiste");
    gameOver = true;
  }

  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      alert("Perdiste");
      gameOver = true;
    }
  }

  
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeRect(food.x, food.y, 10, 10);
}

//Generando comida
function genFood(){
  //Generando coordenadas aleatoreas
  var x = Math.floor(Math.random() * 10) * 30;
  var y = Math.floor(Math.random() * 10) * 30;
  //Ingresando coordenadas a variable -food-
  food = {x: x, y: y};
}

function change_direction(e){
  
  var key;
  button === 0 ?  key = e.keyCode : key = button;

  if((key === 87 || key === 38) && (moveY === 0)){
    moveY = 10;
    moveX = 0;
  } 
  else if((key === 83 || key === 40) && (moveY === 0)){
    moveY = -10;
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

function endGame(){
  snake = [
    {x:150 , y:150},
    {x:160 , y:150},
    {x:170 , y:150}
  ]
  score = 0;
  moveX = 0;
  moveY = 0;
  genFood()
  gameOver = false;
  main();
}

//Borrrando contenido dentro del canvas y agregando borde
function clear_board() {
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(0, 0, snakeGame.width, snakeGame.height);
  ctx.strokeRect(0, 0, snakeGame.width, snakeGame.height);
}

//Funcion principal contiene funciones principales para el funcionamiento del juego
function main(){

  //Removiendo mensaje de incio
  if(moveX != 0 || moveY != 0){
    start_message.style.display = "none";
  } else{
    start_message.style.display = "flex";
  }
  
  board_score.innerText = score;

  setTimeout(() => {
    
      //Limpiar canvas y agregar borde
      clear_board()
      //Mover serpiente
      mover()
      //Dibujar serpiente
      drawSnake()
      //generando comida
      drawFood()
  
      if(gameOver){
        endGame()
      }else{
        //Repetir
        main()
      }
      
    }, 100)
   
}



//despliega mensaje para iniciar juego


genFood()
main();
document.addEventListener("keydown", change_direction);

buttons.top.onclick= function(){ 
  button = 87;  
  change_direction() 
}
buttons.bot.onclick = function(){ 
  button = 83;  
  change_direction() 
}
buttons.left.onclick= function(){ 
  button = 65;  
  change_direction() 
}
buttons.right.onclick = function(){ 
  button = 68;  
  change_direction() 
}

