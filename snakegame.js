
function init() {
    console.log("Initial() called");

    canvas = document.getElementById('mycanvas');
    H = canvas.height = 685;
    W = canvas.width = 685;
    cellsize = 50;  //variable to define cell size of a snake

    image_apple=new Image();
    image_apple.src="Assets/apple.png"

    image_trophy=new Image();
    image_trophy.src="Assets/trophy.png"

    pen = canvas.getContext('2d');
    Score=5;

    food = getRandomFood();
    gameOver = false;

    // creating a snake object
    snake = {
        init_len: 5,        //initial length of a snake
        color: "blue",      //color of a snake
        cells: [],          //this is an array of snake cells
        direction: "right", //default direction of a snake

        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            pen.fillStyle = this.color;
            for (var i = 0; i < this.cells.length; i++) {

                pen.fillRect(this.cells[i].x * cellsize, this.cells[i].y * cellsize, cellsize - 2, cellsize - 2);

            }
        },

        Food: function () {


            var X = food.x;
            var Y = food.y;
            var c = food.color;

            pen.fillStyle = c;
            pen.fillRect(X, Y, cellsize, cellsize);

        },

        updateSnake: function () {

            var headX = this.cells[0].x;
            var headY = this.cells[0].y

            if (headX == food.x && headY == food.y) {
                console.log("Food eaten")
                food = getRandomFood();
                Score+=1;
            }
            else {
                console.log(headX, food.x, headY, food.y);
                // popping the last cell of the snake
                this.cells.pop();
            }

            var nextX, nextY;

            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }

            this.cells.unshift({ x: nextX, y: nextY });

            lastX = Math.round(W / cellsize);
            lastY = Math.round(H / cellsize);

            if(this.cells[0].x < 0 || this.cells[0].x >= lastX || this.cells[0].y < 0 || this.cells[0].y >= lastY) {
                gameOver = true;
            }
            
        }
    }
    
    snake.createSnake();
    function Keypressed(e) {
        if (e.key == "ArrowLeft") {
            if(snake.direction!="right")
                snake.direction = "left";
        }
        else if (e.key == "ArrowRight") {
            if(snake.direction!="left")
                snake.direction = "right";
        }
        else if (e.key == "ArrowDown") {
            if(snake.direction!="up")
                snake.direction = "down";
        }
        else if (e.key == "ArrowUp") {
            if(snake.direction!="down")
                snake.direction = "up";
        }
    }

    // this will call the function Keypressed when any key is pressed in keyboard
    document.addEventListener('keydown', Keypressed);

}


function getRandomFood() {
    foodX = Math.round(Math.random() * (650 - cellsize) / cellsize);
    foodY = Math.round(Math.random() * (650 - cellsize) / cellsize);

    food = {
        x: foodX,
        y: foodY,
        color: "red",
    }

    return food;
}

function draw() {
    console.log("Draw() called");
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    // drawing food
    pen.fillStyle = food.color;
    pen.drawImage(image_apple,food.x * cellsize, food.y * cellsize, cellsize, cellsize);

    pen.drawImage(image_trophy,14,20,cellsize,cellsize);
    pen.fillStyle="blue";
    pen.font="22px Roboto";
    pen.fillText(Score,33,50);

}

function update() {
    console.log("Update() called");
    snake.updateSnake();
}

function gameloop() {
    if (gameOver == true) {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();

}

// calling initial() only once
init();

// calls gameloop() after every 100 mili seconds
f = setInterval(gameloop, 100);