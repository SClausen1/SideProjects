var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;
var ballRadius = 10;

var paddleHeight = 100;
var paddleWidth = 10;
var pRx = canvas.width - paddleWidth - 10;
var pRy = (canvas.height - paddleHeight) / 2 - 50;
var pLx = 10;
var pLy = (canvas.height - paddleHeight) / 2;

var dx = 2;
var dy = -2;

var paddleDy = 7;
var upPressed;
var downPressed;

var playerScore = 0;
var computerScore = 0;

function keyDownHandler(event){
    if( event.keyCode == 38){
        upPressed = true;
    }
    else if(event.keyCode == 40 ){
        downPressed = true;
    }
}

function keyUpHandler(event){
    if( event.keyCode == 38){
        upPressed = false;
    }
    else if(event.keyCode == 40 ){
        downPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function moveLeftPaddle(){
    if(dx < 0){
        if(y > pLy && pLy < canvas.height - paddleHeight){
            pLy += paddleDy;
        }
        else if(y < pLy && pLy > 0 ){
            pLy -= paddleDy;
        }
    }
}

function moveRightPaddle(keyPressed){
    if(keyPressed == "down"   && pRy < canvas.height - paddleHeight){
        pRy += paddleDy;
    }
    else if(keyPressed == "up" && pRy > 0 ){
        pRy -= paddleDy;
    }
}

function paintCanvasBlack(){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(){
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath()
}

function gameOver(){
    context.beginPath();
    context.font = "64px courier new"
    context.fillStyle = "red"
    context.fillText("Game Over", 70,  canvas.height / 2 + 20);
    context.closePath();
}
function resetBall(input){
    if(input == 1){
        x = canvas.width/2;
        y = canvas.height - 30;
    }

}

function userScore(point){
    context.beginPath();
    context.font = "40px courier new"
    context.fillStyle = "white"
    context.fillText(playerScore += point, canvas.width * 3 / 4, canvas.height/5)
    context.closePath();
    resetBall(point);
}

function nonuserScore(point){
    context.beginPath();
    context.font = "40px courier new"
    context.fillStyle = "white"
    context.fillText(computerScore += point, canvas.width /4, canvas.height/5)
    context.closePath();
    resetBall(point);
}

function playerWins(){
    gameOver();
    context.beginPath();
    context.font = "40px courier new"
    context.fillStyle = "red"
    context.fillText("Player Wins",  100,  canvas.height / 2 + 80);
    context.closePath();
}

function computerWins(){
    gameOver();
    context.beginPath();
    context.font = "40px courier new"
    context.fillStyle = "red"
    context.fillText("Computer Wins", 90,  canvas.height / 2 + 80);
    context.closePath();
}

function drawLeftPaddle(){
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(pLx, pLy, paddleWidth, paddleHeight);
    context.closePath();
}

function drawRightPaddle(){
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(pRx ,pRy , paddleWidth, paddleHeight);
    context.closePath();
}






function draw() {
    context.clearRect(0,0, canvas.width, canvas.height);
    paintCanvasBlack();
    drawBall();
    drawLeftPaddle();
    drawRightPaddle();
    moveLeftPaddle();
    userScore(0);
    nonuserScore(0);

    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius){
        dy = -dy;
    }

    if (x + dx < 20 + ballRadius && y + dy >= pLy && y + dy <= pLy + 100) {
        dx = -dx;
    }
    
    if (x  + dx > canvas.width - ballRadius - 20 && y + dy >= pRy  && y + dy <= pRy + 100) {
        dx = -dx;
    }

    if(x == 0 + ballRadius || x == canvas.width - ballRadius){
  
        if (x == 0 + ballRadius){
            userScore(1);
            if(playerScore == 3){
                playerWins();
                return ;
            }

        }
        else{
            nonuserScore(1);
            if(computerScore == 3){
                computerWins();
                return ;
            }   
        }
        
    }

    if(upPressed == true){
        moveRightPaddle("up");
    }
    else if( downPressed == true){
        moveRightPaddle("down");
    }
    
    x += dx;
    y += dy;


   

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);