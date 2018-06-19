/////////////////////////////////////////// BEER ///////////////////////
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row
var beerCount = 0;
var pouring = false;
function createBeer() {
  if (!pouring) {
    pouring = true;

    //add the liquid for the beer
    var $liquid = $("<div class='liquid'></div>");
    var $beerDiv = $("<div class='beer'></div>");
    $beerDiv.attr("id", "data-beer-index" + beerCount);
    $("body").append($beerDiv); //change this append
    $beerDiv.append($liquid); //change this append
  }

  //beerCount++;
  return $beerDiv;
}

function stopFillTheBeer() {}

$("body").on("keydown", function(evt) {
  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR
      console.log("spacebar - pouring beer");
      $(".liquid").animate(
        { height: "-=30" },
        1000,
        // Animation complete.
        function() {
          // Animation complete.
          $("body").off("keyup", stopFillTheBeer);
          $("body").off("keydown", fillTheBeer);
          //on("keydown", fillTheBeer);

          beerIsBeingSent = true;
          sendTheBeer();
        }
      );
      if (!pouring) {
        $beer = createBeer();
        //$("liquid").animate({ height: "-=30" }, 1000);
        $beer.css("display", "block");
      }

      // jump back to tap by pouring (space bar)
      //$bartenderDiv.css("left", bartenderXstart + "px");
      break;
  }
});

//$("body").on("keydown", fillTheBeer);

//$("body").on("keyup", stopFillTheBeer);

function fillTheBeer(evt) {
  console.log("hello");
  if (event.which === 32) {
  }
}
//move the beer across the bar
function sendTheBeer() {
  $beer.css("display", "block");
  $beer.animate({ left: "-=460" }, 10000);
}
