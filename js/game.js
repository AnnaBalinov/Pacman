'use strict';

const FOOD = '.';
const EMPTY = ' ';
const WALL = `<img class="wall" src="img/wall.png">`;
const POWER = `<img class="power" src="img/power.png">`;
const CHERRY = `<img class="cherry" src="img/cherry.png">`;

var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    foodAmount: 56,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    //random cherry
    gCherryInterval = setInterval(randomCherry, 3000, gBoard)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            //add super food (power)
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = POWER;
            }
        }
    }
    return board;
}

function updateScore(item) {

    // model
    switch (item) {
        case 'FOOD':
            gGame.foodAmount -= 1
            gGame.score += 1
            break;
        case 'CHERRY':
            gGame.score += 5
            break;
        case 'POWER':
            gGame.score += 10
            break;
        case 'GHOST':
            gGame.score += 2
            break;
        case 'RESET':
            gGame.score = 0
            gGame.foodAmount = 56
            break;
    }

    if (gGame.foodAmount === 0) {
        victory()
        return
    }

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

}

function gameOver() {
    //dom
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gIntervalGhosts = null;

    //modal
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'

    var msg = document.querySelector('.modal h1')
    msg.innerText = 'GAME OVER'

}

function victory() {
    //dom
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gIntervalGhosts = null;

    //modal
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'

    var msg = document.querySelector('.modal h1')
    msg.innerText = 'VICTORY!'

    console.log('victory')
}


function gameReset() {
    //reset board
    init()

    //reset score
    updateScore('RESET')

    //reset modal
    var modal = document.querySelector('.modal')
    modal.style.display = 'none'
}

//after eating the super food (power)
function onEatSuper() {
    gPacman.isSuper = true

    setTimeout(() => { //after 5s
        gPacman.isSuper = false
        gGhosts.push(...gDeadGhosts)
        gDeadGhosts = []
    }, 5000);

}

function randomCherry(board) {
    var location = getEmptyLocation(board)
    board[location.i][location.j] = CHERRY;
    renderCell(location, CHERRY);
}