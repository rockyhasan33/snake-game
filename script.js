const board = document.querySelector('.game-container');
const banner = document.querySelector('.game-start');


// initial state of game
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let isReady = false;




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
        default:
            break;
    }

    
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y) {
        food = generateFood();
    }else if(head.x > 20 || head.y > 20 || head.x < 1 || head.y < 1) {
        isReady = false;

    }else {
        snake.pop();
    }
 
}

// Generating food with random positon



function generateFood() {
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    return {x, y};
}

function startGame() {
    setInterval(() => {
        draw();
    }, 300)
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
        if(direction !== 'up') {
            direction = 'up';
        }
    }
})