'use strict';

const FOOD = '.';
const EMPTY = ' ';
const WALL = `<img class="wall" src="img/wall.png">`; 
const POWER = `<img class="power" src="img/power.png">`;
const CHERRY = `<img class="cherry" src="img/cherry.png">`;

var gCherryInterval;
var highestScore = 60;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    console.log('hello');
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    //random cherry
    gCherryInterval = setInterval(randomCherry, 10000, gBoard)
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


// update model and dom
function updateScore(diff) {

    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

    if (gGame.score === highestScore) {
        gameOver()
        gGame.score = 0
    }
}


// TODO
function gameOver() {

    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;

    if (gGame.score === highestScore) victory() //eat all food
    else loos() //hitting a ghost
}

function loos() {
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'

    var msg = document.querySelector('.modal h1')
    msg.innerText = 'GAME OVER'
}


function victory() {
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'

    var msg = document.querySelector('.modal h1')
    msg.innerText = 'VICTORY!'
}


function gameReset() {
    //reset board
    init()

    //reset score
    gGame.score = 0;
    updateScore(0)

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

    //Update the highest Score
    highestScore += 10
}