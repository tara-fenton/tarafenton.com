/////////////////////// GLOBALS ///////////////////////////////////////
var rowCount = 6;//6
var colCount = 7;//7
var connect = 4;
var board = [];
var rows = [];
var player = 2;
var winner = 0;
var round = 0;
var $containerDiv = $('body').append("<div id='container'></div>");
var $winDiv = $('#container').append("<div id='win'></div>");
var $dropDiv = $('#container').append("<div id='drop'></div>");
var $boardDiv = $('#container').append("<div id='board'></div>");
var $playAgainDiv = $('#container').append("<div id='playAgain'></div>");
/////////////////////// CREATE THE BOARD //////////////////////////////
function makeBoard(rowCount, colCount) {
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      rows.push(0);
      $('#board').append("<div class='boxes' id='box" + i+j + "'></div>");
    }
    // push the row into the board
    board.push(rows);
    // reset the row
    rows=[];
    $('#board').append('<br>');
  }
}
makeBoard(rowCount, colCount);
/////////////////////// DROP ROW //////////////////////////////////////
function makeDropRow() {
  for (var i = 0; i <= rowCount; i++) {
    $('#drop').append("<div class='dropRow' id='drop" + i + "'></div>");
    // adds event listener for clicking on the individual divs
    $('#drop'+i).on('click', boxClick);
  }
}
makeDropRow();
//remove and add drop row events for end of game and play again
function removeDropRowEvents() {
  for (var i = 0; i <= rowCount; i++) {
    $('#drop'+i).off('click', boxClick);
  }
}
function addDropRowEvents() {
  for (var i = 0; i <= rowCount; i++) {
    $('#drop'+i).on('click', boxClick);
  }
}
// select the column to drop the players pick
function boxClick(evt) {
  //change the player
  if (player === 1) { player = 2; } else { player = 1; }
  var index = Number(evt.target.id.charAt(4));
  //check the position of the first available from the bottom
  for (var col = rowCount - 1; col >= 0; col--) {
    if (board[col][index] === 0) {
      //push the players id in the board array at the open position
      board[col][index] = player;
      // add player red/black style to open div
      $('#box'+col+index).addClass("player"+player);
      break;
    }
  }
  round++;
  //check for a win
  checkForAWin();
}
/////////////////////// PLAY AGAIN - RESET GAME ///////////////////////
function playAgain() {
  //place a button on the page
  $('#playAgain').append("<button>Play Again</button>");
  $('#playAgain').on('click', playAgainClick);
}
function playAgainClick() {
  //reset the board's array
  board=[];
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      // reset the board's styles
      $("#box" + i+j).removeClass("player1");
      $("#box" + i+j).removeClass("player2");
      rows.push(0);
    }
    board.push(rows);
    rows=[];
  }
  // add the drop events back
  removeDropRowEvents(); // if there wasn't a winner to reset it
  addDropRowEvents();
  // reset the winner and winner text
  winner = 0;
  $('#win').text("");
  //reset the player
  player = 2;
  //reset win class style
  $('#win').removeClass('player2win');
}
playAgain();
/////////////////////// CHECK FOR WINSTATES ///////////////////////////
// VERTICAL WIN - dont have to check all the way to the bottom
// so only check the top rows (rowCount - connect)
// and check all the columns
function checkVertical() {
  // loop through the rows
    for (var row = 0; row <= rowCount - connect; row++) {
    // loop through the columns
      for (var col = 0; col < colCount; col++) {
      // checking for 4 down
      if (board[row][col] != 0 &&
          board[row][col] === board[row+1][col] &&
          board[row][col] === board[row+2][col] &&
          board[row][col] === board[row+3][col]) {
        winner = board[row][col];
        return board[row][col];
      }
    }
  }
}
// HORIZONTAL WIN - dont have to check all the way to the right
// so check all the rows
// and only check the left columns (colCount - connect)
function checkHorizontal() {
  // loop through the rows
  for (var row = 0; row < rowCount; row++) {
    // loop through the columns
    for (var col = 0; col <= colCount - connect; col++) {
      // checking for 4 across
      if (board[row][col] != 0 &&
          board[row][col] === board[row][col+1] &&
          board[row][col] === board[row][col+2] &&
          board[row][col] === board[row][col+3]) {
        winner = board[row][col];
        return board[row][col];
      }
    }
  }
}
// DIAGONIAL WIN - DOWN
// dont have to check all the way to the bottom OR right
// so only check the top rows (rowCount - connect)
// and only check the left columns (colCount - connect)
function checkDiagonialDown() {
  // loop through the rows
  for (var row = 0; row <= rowCount - connect; row++) {
    // loop through the columns
    for (var col = 0; col <= colCount - connect; col++) {
      // checking for 4 diagonial top down
      if (board[row][col] != 0 &&
          board[row][col] === board[row+1][col+1] &&
          board[row][col] === board[row+2][col+2] &&
          board[row][col] === board[row+3][col+3]) {
        winner = board[row][col];
        return board[row][col];
      }
    }
  }
}
// DIAGONIAL WIN - UP
// dont have to check all the way to the top OR right
// MUST decrement to start at bottom of board on the rows
// and only check the bottom rows (rowCount - connect)
// and only check the left columns (colCount - connect)
function checkDiagonialUp() {
  // loop through the rows
  for (var row = rowCount - 1; row >= rowCount - connect; row--) {
    // loop through the columns
    for (var col = 0; col <= colCount - connect; col++) {
      // checking for 4 diagonial up
      if (board[row][col] != 0 &&
          board[row][col] === board[row-1][col+1] &&
          board[row][col] === board[row-2][col+2] &&
          board[row][col] === board[row-3][col+3]) {
        winner = board[row][col];
        return board[row][col];
      }
    }
  }
}
function checkForAWin() {
  checkVertical();
  checkHorizontal();
  checkDiagonialDown();
  checkDiagonialUp();
  if (winner !== 0) {
    $('#win').text("Player "+winner+" is the winner!!!!");
    // set the text to red for player 2
    if (winner === 2) {
      $('#win').addClass('player2win');
    }
    removeDropRowEvents(); // stops the game, no more events
  }
  if (round === 42) { //21 rounds per player
    $('#win').text("DRAW!!!! No winner!!!!");
  }
}

// https://stackoverflow.com/questions/15457796/four-in-a-row-logic
