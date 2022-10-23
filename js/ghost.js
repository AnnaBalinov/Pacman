'use strict';

var pinkGHOST = `<img class="ghosts" src="img/pinkghost.gif">`;
var yellowGHOST = `<img class="ghosts" src="img/yellowghost.gif">`;
var redGHOST = `<img class="ghosts" src="img/redghost.gif">`;
var blueGHOST = `<img class="ghosts" src="img/blueghost.gif">`;

var gGhosts = [];
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board, ghostColor) {

    var ghost = {
        img: `<img class="ghosts" src="img/${ghostColor}ghost.gif">`,
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: ghostColor,
    };

    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = ghost.img;

}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board, 'pink');
    createGhost(board, 'yellow');
    createGhost(board, 'red');
    gIntervalGhosts = setInterval(moveGhosts, 1000);

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
    if (nextCellContent === WALL ||
        nextCellContent === pinkGHOST ||
        nextCellContent === yellowGHOST ||
        nextCellContent === redGHOST ||
        nextCellContent === blueGHOST)
        return;

    // hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        if (gPacman.isSuper) {  /////////IF POWER IS ON
            return
        } else {
            gameOver();
            return;
        }
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.img;

    // update the DOM
    renderCell(ghost.location, (gPacman.isSuper) ? blueGHOST : ghost.img);
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

// //style="color: bollywood;
// // getRandomColor()
// function getGhostHTML(ghost) {
//     // var color = (gPacman.isSuper) ? 'blue' : ghost.color;
//     // var ghostImg = `<img class="ghosts" src="img/${color}ghost.gif">`
//     // console.log(ghostImg)
//     // return ghostImg;

//     var color = (gPacman.isSuper) ? 'blue' : ghost.color;
//     var ghostImg = `<img class="ghosts" src="img/${color}ghost.gif">`
//     console.log(ghostImg)
//     return ghostImg;
// }

//Remove the ghosts
function eatGhost(location) {
    var currGhostIdx = null;
    var deadGhost = null;
    for (var x = 0; x < gGhosts.length; x++) {
        if (gGhosts[x].location.i === location.i &&
            gGhosts[x].location.j === location.j) {
            currGhostIdx = x;

            deadGhost = gGhosts.splice(currGhostIdx, 1)[0]
            gDeadGhosts.push(deadGhost)
        }
    }
}