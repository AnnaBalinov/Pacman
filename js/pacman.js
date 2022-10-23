'use strict';

var direction = 0
var PACMAN = `<img style="transform: rotate(${direction}deg)" class="pacman" src="img/pacman.gif">`;  

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (gPacman.isSuper) {     /////////IF POWER IS ON
            console.log('eat ghost');
            eatGhost(gGhosts, nextLocation);
        } else {
            gameOver();
            return;
        }
    };
    if (nextCellContent === CHERRY) updateScore(10);
    if (nextCellContent === FOOD) updateScore(1);
    ////////////////////// eat super food : power  ////////////////////////////////////////////
    if (nextCellContent === POWER) {
        if (gPacman.isSuper) {
            return;
        } else {
            updateScore(1);
            onEatSuper();
        }
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            direction = 270;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            direction = 90;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            direction = 0;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            direction = 180;
            break;
        
    } 
    PACMAN = `<img style="transform: rotate(${direction}deg)" class="pacman" src="img/pacman.gif">`;  
    return nextLocation;
}
