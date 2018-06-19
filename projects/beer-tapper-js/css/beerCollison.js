var beerPosition = 0;
var cutomerPosition = 0;

// TO DO : The beers will collide with several customers
/// get the customers per row
//function getCustomers(row) {
//var customerInt = [];
function getCustomers() {
  // filter through the customers object to find the
  //customers on a given row
  for (var customer in customersObj) {
    //get the customer id to use to create a unquie interval counter
    //console.log(customer);
    //var "customerInt"+customerInt[customer] = setInterval(
    //customerHitsBeer(customerInt[customer], customersObj),
    //100
    //); //this will go in getCustomers
    var thisIsMine = setIntervalOnCustomers(customer);
    console.log(customer);
    //customerHitsBeer(customerInt);
  }
}
function setIntervalOnCustomers(objToSetIntervalOn) {
  var int = setInterval(customerHitsBeer(), 100);
  return int;
}
//getCustomers();
//constantly check where the customers are at
var getCustomersInt = setInterval(getCustomers(), 100);

//check if the customer gets a beer
//on enterframe
function customerHitsBeer() {
  // loop through the customer
  //for (var customer in customersObj) {
  // get the position of the customer
  console.log("made it to costomer hitt s beer");
  // loop through the customers
  for (var beer in beersObj) {
    // get the position of the beer
    beerPosition = parseInt(beersObj[beer].beer.css("left"));
    customerPosition = parseInt(obj.element.css("left"));
    //test for collision
    console.log(" checking " + beerPosition);

    if (beerPosition < cutomerPosition + 40) {
      //clearInterval(int);
      console.log(" WE HAVE COLLISION " + beerPosition);
    }
  }
  //}
}
