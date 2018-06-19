/* removed the class block and any import statements */
/* @pjs preload="fonts/Mina-Bold.ttf","fonts/Mina-Regular.ttf"; */

     Bar bar;
     Bartender bartender;
     static int downLimit;
     ConcurrentHashMap<String, Customer> customers = new ConcurrentHashMap<>();
     int customerCounter = 0;
     int customerAmount = 4;
     int returningCustomers = 0;

     ConcurrentHashMap<String, Beer> beers = new ConcurrentHashMap<>();
     int beerCount;

     GetReady getReady;
     Lives lives;
     Points points;
     Level level;
     GameOver gameOver;

     void settings() {
        size(800, 600);
    }

     void setup(){
        processing = this;

        bar = new Bar();

        bartender = new Bartender();
        downLimit = Bartender.getStartY() + Bar.getPadding() * Bar.getAmount();

        getReady = new GetReady(0);
        lives = new Lives(3);
        points = new Points(0);
        level = new Level(1);

        setLevelUp();
        level.setIsPlaying(true);
    }

     void setLevelUp(){
        // level.setReady(true);
        getReady.setTime(0);
        // remove all customers
        for (String key : customers.keySet()) {
            customers.remove(key);
        }
        // used for customer speed
        double lower = 0.01;
        double upper = 1.34;
        // make customers
        for (int i = 0; i < customerAmount*level.getLevel(); i++) {
            // used for customer speed
            double result = Math.random() * (upper - lower) + lower;

            customers.put("customers"+i, new Customer(Customer.getStartX(),
                    Bartender.getStartY() + Bar.getPadding() * customerCounter, result ));
            customerCounter++;
            // check if customerCounter needs to be reset
            if (customerCounter >= customerAmount) customerCounter = 0;
        }
        // reset returning customers
        returningCustomers = 0;

        // remove all beers
        for (String key : beers.keySet()) {
            beers.remove(key);
        }
        // reset beer count
        beerCount = 0;
    }

    /* Interval
     * */
     void draw() {

        processing.background(0);

        if (!level.getIsPlaying()) {
            bar.setup();

            bartender.draw();

            makeCustomersMove();

            makeBeersMove();

            lives.draw();
            points.draw();
            level.draw();

            checkForWin();

        } else {

            displayGetReady();
        }
    }
    /* Checks for win.
     * */
     void checkForWin() {
        // check if all customers are returning - WON LEVEL
        if (returningCustomers == customerAmount * level.getLevel()) {
            level.setLevel(level.getLevel()+1);
            setLevelUp();
            level.setIsPlaying(false);

        } else returningCustomers = 0;
    }
    /* For each of the customers are moving if the bartender is alive.
    * If the customer is moving forward then draw it orElse the customer moving backward to beginning of bar.
    * Next check through all the beer to see if they collided with the customer. If they collided
    * change the directions of the customer and the beer and give the player points. If the beer makes it to the
    * of the bar kill the bartender. If the customer gets to the end of the bar kill the bartender.
    * */
     void makeCustomersMove(){
        // make each customer move
        for (String customer : customers.keySet())
            // check if bartender is alive
            if (Bartender.getAlive()) {
                // check if customer is moving forward is true
                if (customers.get(customer).getMovingForward()) {

                    // draw customer
                    customers.get(customer).moveForward();

                    // for each beer for each customer
                    for (String key : beers.keySet()) {
                        // check if beers collide with customer
                        if (customers.get(customer).getCurrentX() + 40 > beers.get(key).getCurrentX() &&
                                customers.get(customer).getCurrentY() == beers.get(key).getCurrentY() - 10) {
                            // set customer moving to bartender false
                            customers.get(customer).setMovingForward(false);
                            // set  beer moving towards customer to false
                            beers.get(key).setMovingForward(false);
                            // 50 Points for each saloon patron you send off his aisle
                            points.setPoints(points.getPoints() + 50);
                        }
                        // check if beer reaches the end of the bar
                        if (beers.get(key).getCurrentX() > Bar.getEnd()) {
                            //kill bartender
                            Bartender.setAlive(false);
                            lives.setLives(lives.getLives() - 1);
                        }
                    }
                    // check if customer reaches the end of the bar
                    if (customers.get(customer).getCurrentX() > Bar.getEnd()) {
                        //kill bartender
                        Bartender.setAlive(false);
                        lives.setLives(lives.getLives() - 1);
                    }
                    // else - customer is moving forward is false, customers moving backward to beginning of bar
                } else {
                    if (customers.get(customer).getCurrentX() > Bar.getStartX()) customers.get(customer).moveBackward();
                    // count the number of returning customers
                    returningCustomers++;
                }
                // else - the bartender died, what to do??
            } else {
                // stop customers
                // customers.get(customer).stop();
                setLevelUp();
                level.setIsPlaying(true);
                //displayGetReady();
            }
    }

    /* For each of the beers are moving if the bartender is alive and this beer is not collected.
     * If the beer is moving forward then draw it.
     * If the beer reaches the end without colliding with a customer kill the bartender.
     * If bartender collides to collect glass, make the glass disappear and give the player points.
     * */
     void makeBeersMove() {
        // make beers move
        for (String key : beers.keySet()) {
            // check if bartender is alive and beer is not collected
            if (Bartender.getAlive() && !beers.get(key).getCollected()) {
                // check if beer is moving forward is true
                if (beers.get(key).getMovingForward()) {
                    // draw beer
                    beers.get(key).moveForward();
                    // check if it reaches the end without colliding with customer
                    if (beers.get(key).getCurrentX() < Bar.getStartX()) {
                        //kill bartender
                        Bartender.setAlive(false);
                        lives.setLives(lives.getLives() - 1);
                        //displayGetReady();
                    }
                }
                // beer moving forward is false - going back to bartender
                else {
                    // check if bartender collides to collect glass
                    if (beers.get(key).getCurrentX() + 15 > Bartender.getCurrentX() &&
                            beers.get(key).getCurrentY() - 10 == Bartender.getCurrentY()) {
                        beers.get(key).setCollected(true);
                        // 100 Points for each empty mug you pick up
                        points.setPoints(points.getPoints() + 100);
                        // else if - check if beer reached the end of the bar without bartender collecting
                    } else if (beers.get(key).getCurrentX() > Bar.getEnd()) {
                        //kill bartender
                        System.out.println("kill bartender");
                        Bartender.setAlive(false);
                        lives.setLives(lives.getLives() - 1);
                        //getReady.setTime(0);
                        //displayGetReady();
                        // else - keep moving it toward the bartender
                    } else {
                        // going back to the bartender
                        beers.get(key).moveBackward();
                    }
                }
                // make sure bartender is alive to fix freezing bug
            } else if (Bartender.getAlive()) {
                // only happens once because of the && in the if statement
                // check if beer is collected
                if (beers.get(key).getCollected()) {
                     // make beer disappear
                    beers.get(key).empty();
                } else {
                    // stop beers, bartender killed
                    beers.get(key).stop();
                    setLevelUp();
                    level.setIsPlaying(true);
                    // displayGetReady();
                }
            }
        }
    }
    /* In between screens
     *
     * */
     void displayGetReady() {
        // check if bartender is alive
        if (!Bartender.getAlive() && lives.getLives() != 0) {
            if (getReady.getTime() < 50){
//                System.out.println(getReady.getTime());
                // getReady.draw();
                getReady.setTime(getReady.getTime()+1);
            } else if (getReady.getTime() < 130){
                // draw ready to serve timer
                getReady.draw();
                getReady.setTime(getReady.getTime()+1);
            } else {
                level.setIsPlaying(false);
                getReady.setTime(0);
                Bartender.setAlive(true);
            }
        }
        if (lives.getLives() <= 0){
            gameOver = new GameOver();
            gameOver.draw();
            // lives.setLives(3);
        }

    }

    /* When the space bar is pressed pour a beer and send bartender to tap if needed.
     * Up and Down moves the bartender and loops around if needed
     * Left and Right moves the bartender with restrictions
     * */
     void keyPressed() {
        // space bar
        if (key == ' ') {
            // check if bartender needs to get sent back to tap
            if(Bartender.getCurrentX() < Bartender.getStartX()) Bartender.setCurrentX(Bartender.getStartX());
            // create a beer
            beers.put("beer"+beerCount, new Beer((double) Bartender.getCurrentX(),Bartender.getCurrentY()));
            beerCount++;
        }
        if (key == CODED) {
            if (keyCode == UP || keyCode == CAPS_LOCK || keyCode == RETURN) {
                // move the bartender up
                Bartender.setCurrentY(Bartender.getCurrentY() - Bar.getPadding());

                // check if bartender needs to loop around from the top to the bottom
                if(Bartender.getCurrentY() < Bartender.getStartY())
                    Bartender.setCurrentY(Bartender.getStartY() + Bar.getPadding() * (Bar.getAmount() - 1));

                // check if bartender needs to get sent back to tap
                if(Bartender.getCurrentX() < Bartender.getStartX()) Bartender.setCurrentX(Bartender.getStartX());
            }

            if (keyCode == DOWN || keyCode == SHIFT){
                // move the bartender down
                Bartender.setCurrentY(Bartender.getCurrentY() + Bar.getPadding());

                // check if bartender needs to loop around from the bottom to the top
                if (Bartender.getCurrentY() >= downLimit) Bartender.setCurrentY(Bartender.getStartY());

                // check if bartender needs to get sent back to tap
                if(Bartender.getCurrentX() < Bartender.getStartX()) Bartender.setCurrentX(Bartender.getStartX());
            }
            // 'a' doesn't work for now
            if (keyCode == LEFT || key == 'a'){
                // move the bartender left
                Bartender.setCurrentX(Bartender.getCurrentX() - 5);

                // restrict from moving past the left of bar
                if (Bartender.getCurrentX() < Bar.getStartX()) Bartender.setCurrentX(Bar.getStartX());
            }
            // 's' doesn't work for now
            if (keyCode == RIGHT || key == 's'){
                // move the bartender right
                Bartender.setCurrentX(Bartender.getCurrentX() + 5);

                // restrict from moving past the right
                if (Bartender.getCurrentX() > Bartender.getStartX()) Bartender.setCurrentX(Bartender.getStartX());
            }
        }
    }

     void keyReleased(){
        if (keyCode == UP){
//            System.out.println("released: " + keyCode);
        }
    }
}

/* paste additional classes here.  remove the "" declaration from the class definition and any import statements */

class Bar {

    private static int BARS_AMOUNT = 4;
    private static int BAR_PADDING = 120;
    private static int BAR_START_X = 200;
    private static int BAR_START_Y = 140;
    private static int BAR_WIDTH = 400;
    private static int BAR_HEIGHT = 40;

    public void setup(){
        for (int i = 0; i < BARS_AMOUNT; i++) {
            MainClass.processing.fill(165,55,55);
            MainClass.processing.noStroke();
            MainClass.processing.rect(BAR_START_X,BAR_START_Y+i*BAR_PADDING,BAR_WIDTH,BAR_HEIGHT);
        }
    }

    public static int getPadding(){
        return BAR_PADDING;
    }
    public static int getAmount(){
        return BARS_AMOUNT;
    }
    public static int getStartX(){
        return BAR_START_X;
    }
    public static int getEnd() { return BAR_START_X + BAR_WIDTH; }
}
class Bartender {

    // positions for controlling bartender
    private static int BARTENDER_START_X = 620;
    private static int BARTENDER_START_Y = 100;
    private static int BARTENDER_WIDTH = 40;
    private static int BARTENDER_HEIGHT = 80;
    private static int currentX = BARTENDER_START_X;
    private static int currentY = BARTENDER_START_Y;
    private static boolean isAlive = false;

    private static PApplet p = MainClass.processing;

    public void draw(){
        p.fill(196,37,215);
        p.noStroke();
        p.rect(currentX,currentY,BARTENDER_WIDTH,BARTENDER_HEIGHT);
    }

    public static int getStartX(){
        return BARTENDER_START_X;
    }

    public static int getStartY(){
        return BARTENDER_START_Y;
    }

    public static int getCurrentX(){
        return currentX;
    }

    public static int setCurrentX(int x){
        return currentX = x;
    }

    public static int getCurrentY(){
        return currentY;
    }

    public static void setCurrentY(int y){
        currentY = y;
    }

    public static boolean getAlive() {
        return isAlive;
    }

    public static boolean setAlive(boolean value){
        return isAlive = value;
    }

}


class Beer {

    public static int BEER_WIDTH = 15;
    public static int BEER_HEIGHT = 30;
    public double currentX;
    private int currentY;
    private boolean isMovingForward = true;
    private boolean isCollected = false;

    private static PApplet p = MainClass.processing;

    public Beer(double x, int y){
        currentX = x - 20;
        currentY = y + 10;
    }

    public void moveForward(){
        // yellow
        p.fill(252,252,0);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,BEER_WIDTH,BEER_HEIGHT);

        currentX = currentX - 2;
    }

    public void moveBackward(){
        // white
        p.fill(256,256,256);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,BEER_WIDTH,BEER_HEIGHT);

        currentX = currentX + 0.5;
    }

    public void stop(){
        // red
        p.fill(256,0,0);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,BEER_WIDTH,BEER_HEIGHT);
    }

    public void empty(){
        // disappear
        p.rect(0,0,0,0);
    }

    public double getCurrentX() {
        return this.currentX;
    }
    public int getCurrentY() {
        return this.currentY;
    }

    public boolean getMovingForward() {
        return isMovingForward;
    }
    public boolean setMovingForward(boolean value){
        return isMovingForward = value;
    }

    public boolean getCollected() {
        return isCollected;
    }
    public boolean setCollected(boolean value){
        return isCollected = value;
    }
}

class Customer {

    private static double CUSTOMER_START_X = 170;
    private int CUSTOMER_WIDTH = 40;
    private int CUSTOMER_HEIGHT = 80;
    private double currentX;
    private int currentY;
    private double speed;
    private boolean isMovingForward = true;

    public Customer(double x, int y, double s){
        currentX = x;
        currentY = y;
        speed = s;
    }

    private static PApplet p = MainClass.processing;

    public void moveForward(){
        // blue
        p.fill(0, 0, 256);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,CUSTOMER_WIDTH,CUSTOMER_HEIGHT);

        this.currentX = this.currentX + this.speed;
    }

    public void moveBackward(){
        // green
        p.fill(0, 256, 0);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,CUSTOMER_WIDTH,CUSTOMER_HEIGHT);

        this.currentX = this.currentX - 0.5;
    }

    public void stop(){
        // red
        p.fill(256,0,0);
        p.noStroke();
        p.rect((int) this.currentX,this.currentY,CUSTOMER_WIDTH,CUSTOMER_HEIGHT);
    }

    public static double getStartX(){
        return CUSTOMER_START_X;
    }

    public double getCurrentX(){
        return this.currentX;
    }
    public int getCurrentY(){
        return currentY;
    }

    public boolean getMovingForward() {
        return isMovingForward;
    }
    public boolean setMovingForward(boolean value){
        return isMovingForward = value;
    }
}


class GameOver {

    private static PApplet p = MainClass.processing;

    public GameOver() {
    }

    public void draw() {

        PFont mina;
        mina = p.createFont("fonts/Mina-Regular.ttf", 60);
        p.textFont(mina);
        p.text("GAME OVER", 260, 280);
        p.fill(252, 252, 0);

        p.textFont(mina);
        p.text("[ INSERT QUARTER ]", 160, 360);
        p.fill(196,37,215);
    }
//    void mouseClicked() {
//        System.out.println("mouse clicked");
//    }
}

class GetReady {

    private int amount;

    private static PApplet p = MainClass.processing;

    public GetReady(int amount){
        this.amount = amount;
    }

    public void draw(){

        PFont mina;
        mina = p.createFont("fonts/Mina-Regular.ttf", 60);
        p.textFont(mina);
        p.text("get ready to serve", 160, 320);
        p.fill(252, 252, 0);
    }

    public int getTime() {
        return this.amount;
    }
    public int setTime(int n) {
        return this.amount = n;
    }
}

class Level {

    private int amount;
    private boolean isPlaying = false;

    private static PApplet p = MainClass.processing;

    public Level(int amount){
        this.amount = amount;
    }

    public void draw(){
        p.textSize(32);
        p.fill(256, 256, 256);
        p.text(amount, 760, 560);
    }

    public int getLevel() {
        return this.amount;
    }
    public int setLevel(int n) {
        return this.amount = n;
    }

    public boolean getIsPlaying() {
        return isPlaying;
    }
    public boolean setIsPlaying(boolean value){
        return isPlaying = value;
    }
}

class Lives {

    private int amount;
    private static PApplet p = MainClass.processing;

    public Lives(int amount){
        this.amount = amount;
    }

    public void draw(){
        // yellow
        for (int i = 0; i < this.amount; i++) {
            p.fill(252,252,0);
            p.noStroke();
            p.rect(350 + (Beer.BEER_WIDTH + Beer.BEER_WIDTH) * i ,20, Beer.BEER_WIDTH,Beer.BEER_HEIGHT);
        }
    }

    public int getLives() {
        return this.amount;
    }
    public int setLives(int n) {
        return this.amount = n;
    }
}


class Points {

    private int amount;
    private static PApplet p = MainClass.processing;

    public Points(int amount){
        this.amount = amount;
    }

    public void draw(){
        p.textSize(32);
        p.fill(256, 256, 256);
        p.text(amount, 20, 40);
    }

    public int getPoints() {
        return this.amount;
    }
    public int setPoints(int n) {
        return this.amount = n;
    }
}
