'use strict';
var ghostColor = 'pink'
var GHOST = `<img class="ghosts" src="img/${ghostColor}Ghost.gif">`;
// '&#9781;';

var gGhosts = [];
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board, ghostColor) {
    GHOST = `<img class="ghosts" src="img/${ghostColor}Ghost.gif">`;
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: ghostColor
    };
    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = GHOST;

}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board, 'pink');
    createGhost(board, 'yellow');
    createGhost(board, 'red');
    gIntervalGhosts = setInterval(moveGhosts, 2000);
    
}

// loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        gameOver();
        return;
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

//style="color: bollywood;
// getRandomColor()
function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'blue' : ghost.color;
    return `<img class="ghosts" src="img/${color}Ghost.gif">`;
}

//Remove the ghosts
function eatGhost(ghosts, location) {
    var currGhostIdx = null;
    for (var x = 0; x < ghosts.length; x++) {
        if (ghosts[x].location.i === location.i &&
            ghosts[x].location.j === location.j) {
            currGhostIdx = x;
        }
    }
    var deadGhost = ghosts.splice(currGhostIdx, 1)[0]
    gDeadGhosts.push(deadGhost)
}