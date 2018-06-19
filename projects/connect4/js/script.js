// console.log('Linked!');
//draw 1,2,5,3,6,4,7,9,8
//win  5,2,3,6,9,8,4,1,7
//make an array that holds the win states
var winStates = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
var choicesX = [];
var choicesO = [];
var counter = 0;
function checkForWins (array) {
  // goes through array of wins
  for (var i = 0; i < winStates.length; i++) {
    counter = 0;
    // goes through the choices of the player
    for (var j = 0; j < array.length; j++) {
      // goes through the winStates at that fromIndex
      for (var k = 0; k < winStates[i].length; k++) {
        // console.log(winStates[i], array[j], winStates[i][k]);
        if (winStates[i][k] === array[j]) {
          counter ++;
        }
        if (counter === 3) {
          alert("WIN!");
        };
      }
    }
  }
}
// arr.includes(searchElement[, fromIndex])
// loops through 9 to create div boxes onto DOM
var $containerDiv = $('body').append("<div id='container' width='400px'></div>");
//$('body').append($containerDiv)

for(var i = 1; i <= 9; i++) {


  $('#container').append("<div class='boxes' id='box" + i + "'>" + i + "</div>");
  $('#box'+i).css({"border": "4px solid black", "width": "120", "height": "120", "display": "inline-block"});
  $('#container').css('width', "400");
  // adds event listener for clicking on the individual divs
  $('#box'+i).on('click', boxClick);
}
var round = 0;
function boxClick(evt) {
  var index = evt.target.id.charAt(3);

    if (round % 2 > 0) {
      choicesX.push(Number(index))
      checkForWins(choicesX);
      // push into X
      $('#box'+index).text('X')
    } else {
      choicesO.push(Number(index))
      checkForWins(choicesO);
      // push into O
      $('#box'+index).text('O')
    }

    $(evt.target).off();
    if (round === 9) {
        alert('DRAW!');
    }
    round++;
    console.log(round);
  }
