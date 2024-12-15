const board = document.querySelector('.game-container');
const banner = document.querySelector('.game-start');
const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');


// initial state of game
let snake = [{x: 10, y: 10}, {x: 11, y: 10}];
let food = generateFood();
let direction = 'right';
let isReady = false;
let scoreBoard = 0;
let stopGame;
let gameDelay = 200;



// Set high score from local Storage ;

highScore.textContent = (JSON.parse(localStorage.getItem('score')) < 10) ? `00${(JSON.parse(localStorage.getItem('score')) || 0)}` : (JSON.parse(localStorage.getItem('score')) >= 10) ? `0${JSON.parse(localStorage.getItem('score'))}` : JSON.parse(localStorage.getItem('score'));


function draw() {
    board.innerHTML = '';
    banner.classList.add('hide');
    drawSnake();
    drawFood();
    move();
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if(index === 0) {
            const snakeElement = createGameElement('div', 'head');
            setPosition(snakeElement, segment);
            board.append(snakeElement);
        }else {

            const snakeElement = createGameElement('div', 'snake');
            setPosition(snakeElement, segment);
            board.append(snakeElement);
        }
    })
}


// Creating the food

function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}



// Move the snake

function move() {

    let head = {...snake[0]};
    
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    
    snake.unshift(head);

    

    if(head.x === food.x && head.y === food.y) {
        scoreBoard++;
        if(scoreBoard >= 10 && scoreBoard <= 15) {
            clearInterval(stopGame);
            gameDelay = 170; 
            startGame()
        }else if(scoreBoard > 15 && scoreBoard <= 20) {
            clearInterval(stopGame);
            gameDelay = 150;
            startGame()
        }else if(scoreBoard > 20 && scoreBoard <= 25) {
            clearInterval(stopGame);
            gameDelay = 130;
            startGame()
        }else if(scoreBoard > 25 && scoreBoard <= 30) {
            clearInterval(stopGame);
            gameDelay = 130;
            startGame()
        }else if(scoreBoard > 30 && scoreBoard <= 35) {
            clearInterval(stopGame);
            gameDelay = 100;
            startGame()
        }else if(scoreBoard > 35 && scoreBoard <= 40) {
            clearInterval(stopGame);
            gameDelay = 80;
            startGame()
        }
        
        if(scoreBoard < 10) {
            score.textContent = `00${scoreBoard}`;
        }else if(scoreBoard >= 10) {
            score.textContent = `0${scoreBoard}`;
        }
        
        food = generateFood();


    }else if(head.x > 20 || head.y > 20 || head.x < 1 || head.y < 1) {
        if(scoreBoard > JSON.parse(localStorage.getItem('score'))) {
            localStorage.setItem('score', JSON.stringify(scoreBoard));
            if(scoreBoard < 10) {
                highScore.textContent = `00${scoreBoard}`;
            }else if(scoreBoard >= 10) {
                highScore.textContent = `0${scoreBoard}`;
            }
        }
        clearInterval(stopGame);
        isReady = false;
        snake = [{x: 10, y: 10}, {x:11, y: 10}];
        gameDelay = 200;
        score.textContent = '000';
        banner.classList.remove('hide');
        scoreBoard = 0;
        direction = 'right';
        food = generateFood();
        
    }else {
        snake.pop();
    }


    chekcCollision(head);
 
}


// Generating food with random positon
function generateFood() {
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    return {x, y};
}


// Start Game function
function startGame() {
    stopGame = setInterval(() => {
        draw();
    }, gameDelay)
}


// Check the collision
function chekcCollision(head) {
    for(let i = 3; i < snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y) {
            if(scoreBoard > JSON.parse(localStorage.getItem('score'))) {
                localStorage.setItem('score', JSON.stringify(scoreBoard));
                if(scoreBoard < 10) {
                    highScore.textContent = `00${scoreBoard}`;
                }else if(scoreBoard >= 10) {
                    highScore.textContent = `0${scoreBoard}`;
                }
            }
            clearInterval(stopGame);
            isReady = false;
            snake = [{x: 10, y: 10}, {x:11, y: 10}];
            gameDelay = 200;
            score.textContent = '000';
            banner.classList.remove('hide');
            scoreBoard = 0;
            direction = 'right';
            food = generateFood();
        }
    }
}





window.addEventListener('keydown', (e) => {

    if(e.key === ' ' && isReady === false) {
        isReady = true;
        startGame();
    }else if(e.key === 'ArrowRight') {
        if(direction !== 'left') {
            direction = 'right';
        }
    }else if(e.key === 'ArrowLeft') {
        if(direction !== 'right') {
            direction = 'left';
        }
    }else if(e.key === 'ArrowDown') {
        if(direction !== 'up') {
            direction = 'down';
        }
    }else if(e.key === 'ArrowUp') {
        if(direction !== 'down') {
            direction = 'up';
        }
    }
})