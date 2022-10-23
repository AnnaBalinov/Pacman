'use strict';

var gDirection = 0
var PACMAN = `<img style="transform: rotate(${gDirection}deg)" class="pacman" src="img/pacwoman.gif">`;

var gPacman = {
    // location: {
    //     i: 6,
    //     j: 6
    // },
    // isSuper: false,
};

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
    if (nextCellContent === pinkGHOST ||
        nextCellContent === yellowGHOST ||
        nextCellContent === redGHOST ||
        nextCellContent === blueGHOST) {
        if (gPacman.isSuper || nextCellContent === blueGHOST) {     /////////IF POWER IS ON
            eatGhost(nextLocation);
            updateScore('GHOST')
        } else {
            gameOver();
            return;
        }
    };
    if (nextCellContent === FOOD) updateScore('FOOD');
    if (nextCellContent === CHERRY) updateScore('CHERRY');
    ////////////////////// eat super food : power  ////////////////////////////////////////////
    if (nextCellContent === POWER) {
        if (gPacman.isSuper) {
            return;
        } else {
            updateScore('POWER');
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
            gDirection = 270;
            nextLocation.i++;
            break;
        case 'ArrowUp':
            gDirection = 90;
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            gDirection = 0;
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gDirection = 180;
            nextLocation.j++;
            break;

    }
    PACMAN = `<img style="transform: rotate(${gDirection}deg)" class="pacman" src="img/pacwoman.gif">`;
    return nextLocation;
}
