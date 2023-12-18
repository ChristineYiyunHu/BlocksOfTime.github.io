/*eslint-env browser */
/*exproted start,run */

var blocks_gray = [];
var blocks_blue1 = [];
var the_blue_blocks = [];
var full_rows =[];
var ctx;
var display;
var randomm;
var num_row = 0;
var num_col = 0;
var ind_row = [];
var ind_col = [];
var score = 0;
var unseen_time;
var two_min;
var init_time;
var final_time;          
var seconds;
var extra_time = 0;
var countDownDate = new Date().getTime();
var win_sec = 0;
var very_extra_time = 0;
var heigh_time = 0;
var running = true;
var call_win;


// randomly generates a green shape/ moveable block
function generate_blue(){
    randomm = Math.random()*20; // generate a random number, 0 <= random number < 20
    if(randomm > 19){ // if the random number is greater than 19, then generate a one block shape
        blocks_blue1.push(new Blocks_green(64,64)); // (x,y) is the x and y cordinate on the screen
    }else if(randomm > 17){ // if the random number is greater than 17 and less than 19, generate a three block shape
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(96,96));
    }
    else if(randomm > 15){
        blocks_blue1.push(new Blocks_green(96,32));
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(32,96));
    }
    else if(randomm > 14){
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(64,64));
    }
    else if(randomm > 13){
        blocks_blue1.push(new Blocks_green(64,32));
        blocks_blue1.push(new Blocks_green(32,64));
    }
    else if(randomm > 12){ 
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(32,64));
        blocks_blue1.push(new Blocks_green(64,32));
    }
    else if(randomm > 10){
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(64,32));
    }
    else if (randomm > 8){
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(64,32));
        blocks_blue1.push(new Blocks_green(64,64+32));
    }else if (randomm > 7){
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(32,64));
        blocks_blue1.push(new Blocks_green(96,64));
    }else if (randomm >6){
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(64,32));
        blocks_blue1.push(new Blocks_green(32,64));
    }else if(randomm > 5){
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(64,32));
        blocks_blue1.push(new Blocks_green(32,32));
    }else if(randomm > 4){
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(32,64));
        blocks_blue1.push(new Blocks_green(64,64));
    }
    else if(randomm > 2){
        blocks_blue1.push(new Blocks_green(32,32));
        blocks_blue1.push(new Blocks_green(32,64));
    }
    else{
        blocks_blue1.push(new Blocks_green(64,64));
        blocks_blue1.push(new Blocks_green(32,64));
        blocks_blue1.push(new Blocks_green(64,32));
        blocks_blue1.push(new Blocks_green(32,32));
    }
}

//checks if there are any full rows and puts their index in to ind_row array
function whole_row(){
    if(the_blue_blocks.length >=10){ // after space key is pressed, the moving blocks (blocks_blue1[]) will be transformed into non moving blocks (the_blue_blocks[])
        for(var i = 0; i < display.width; i+=32){ // runs through all x cordinates on the screen
            for(var j = 0; j< the_blue_blocks.length; j++){ // runs through all elements in the array, 
                if(the_blue_blocks[j].the_yy() == i){ // if one of the element on the array matches the y axis of the blacks in that row, then +1
                    num_row++;
                }
            }
            if(num_row == 10){ // if 10 is reached, that means the row is full because there are 10 spaces each row
                ind_row.push(i); // and the filled row number is then recorded
                ten_block_sound.play();
            }
            num_row = 0; // set to 0 and start the loop again to the next row
        }   
    }
    whole_col();
}

// checks if there are any full columns and puts their index into ind_col array
function whole_col(){
    if(the_blue_blocks.length >=10){
        for(var i = 0; i < display.height; i+=32){
            for(var j = 0; j< the_blue_blocks.length; j++){
                if(the_blue_blocks[j].the_xx() == i){
                    num_col++;
                }
            }
            if(num_col == 10){
                ind_col.push(i);
                ten_block_sound.play();
            }
            num_col = 0;
        }   
    }
    remove_row_col();
}

// removes the column or row that were filled
function remove_row_col(){
    
    for(var i =0; i<ind_col.length; i++){ // runs through all the filled columns
        for(var k = 0; k< the_blue_blocks.length; k++){
            if(the_blue_blocks[k].the_xx() == ind_col[i]){ //ind_col[] later used in clear_ind_col() for removing the specific column
                the_blue_blocks.splice(k,1); // removes all the blocks on the filled columns
                k-=1;
            }
        }
    }
    for(var j = 0; j<ind_row.length; j++){ // removes all blocks in the filled rows
        for(var b = 0; b< the_blue_blocks.length; b++){
            if(the_blue_blocks[b].the_yy() == ind_row[j]){
                the_blue_blocks.splice(b,1);
                b-=1;
            }
        }
    }
    
    clear_ind_col();
    clear_ind_row(); // this way we can clear rows and columns at the same time
}

function clear_ind_col(){ //remove the specific column and adds 10 points and 4 seconds to the timer for each column cleared
    
    for(var a = ind_col.length; a > 0; a--){
        ind_col.shift();
        score+=10;
        extra_time+=4000;
    }
    
}
function clear_ind_row(){ //remove the specific row and add 10 pts and 4 sec for each row cleared
    for(var a = ind_row.length; a > 0; a--){
        ind_row.shift();
        score+=10;
        extra_time+=4000;
        
    }
    
}
function clear_blue_array(){ //clear the moving block after space bar is hit
    for(var i = blocks_blue1.length; i >0 ; i--){
        blocks_blue1.shift();
    }
}

function generate_background() { //generates the gray background
    for(var j = 0; j*32< display.height; j++){
        for (var i = 0; i*32 < display.width; i++){
            blocks_gray.push(new Blocks_gray(32*i, j*32));
        }
    }
}

class Blocks_gray{ // gray blocks, background
    static sprite;
    static load_sprite(){
        Blocks_gray.sprite = document.createElement('img');
        Blocks_gray.sprite.src = "gray.png";
    }
    constructor(x,y){ //enables adding new blocks at specific coordinates such as Blocks_gray(32,32) 
        this.x = x;
        this.y = y;
    }
    draw_blocks() {
        ctx.drawImage(Blocks_gray.sprite, this.x, this.y);
    }
    the_xx(){ //returns the x axis of that block
        return this.x;
    }the_yy(){
        return this.y;
    }
}

class Blocks_blue{ // blue blocks that can be canceled, immovables
    static sprite;
    static load_sprite(){
        Blocks_blue.sprite = document.createElement('img');
        Blocks_blue.sprite.src = "blue.png";
    }
    constructor(x,y){
        this.x = x; 
        this.y = y;
    }
    draw_blocks(){
        ctx.drawImage(Blocks_blue.sprite, this.x, this.y);
    }
    the_x(a){ // gain access to blocks' x and y cordinates
        this.x = a;
    }
    the_y(b){
        this.y = b;
    }
    the_xx(){
        return this.x;
    }
    the_yy(){
        return this.y;
    }
}

class Blocks_green{ // green blocks, movable blocks
    static sprite;
    static load_sprite(){
        Blocks_green.sprite = document.createElement('img');
        Blocks_green.sprite.src = "blue1.png";
    }
    constructor(x,y){
        this.x = x; 
        this.y = y;
    }
    draw_blocks(){
        ctx.drawImage(Blocks_green.sprite, this.x, this.y);
    }
    the_x(a){
        this.x = a;
    }
    the_y(b){
        this.y = b;
    }
    the_xx(){
        return this.x;
    }
    the_yy(){
        return this.y;
    }
}
    
function not_on_left_edge(){ // stop moving left if its on the left edge of the screen
    for(var i = 0; i<blocks_blue1.length; i++){
        if(blocks_blue1[i].the_xx() == 0){
            return false;
        }
    }return true;
}
function not_on_right_edge(){ // stops moving right if on right edge of screen
    for(var i = 0; i<blocks_blue1.length; i++){
        if(blocks_blue1[i].the_xx() == display.width-32){
            return false;
        }
    }return true;
}
function not_on_lower_edge(){
    for(var i = 0; i < blocks_blue1.length; i++){
        if(blocks_blue1[i].the_yy() == display.height - 32){
            return false;
        }
    }return true;
}
function not_on_upper_edge() {
    for(var i = 0; i < blocks_blue1.length; i++) {
        if(blocks_blue1[i].the_yy() == 0) {
            return false;
        }
    } return true;
}
function can_place_down(){ //if there are no blue (immovable) blocks at the same coordinate as the green (moveable) blocks, then the moving block can be placed down
    for(var i = 0; i<blocks_blue1.length; i++){
        for(var j = 0; j<the_blue_blocks.length; j++){
            if(blocks_blue1[i].the_xx() == the_blue_blocks[j].the_xx() && blocks_blue1[i].the_yy() == the_blue_blocks[j].the_yy()){
                return false;
            }
        }
    }
    return true;
}

function key_pressed(event){ 
    if(event.keyCode == 37 && not_on_right_edge() && running) {//move to the right if not on right edge and running is true
        for(var i = 0; i<blocks_blue1.length; i++){
            blocks_blue1[i].the_x(blocks_blue1[i].the_xx() + 32);
        }
    }
    else if (event.keyCode == 39 && not_on_left_edge() && running){ // move left
        for(var i = 0; i<blocks_blue1.length; i++){
            blocks_blue1[i].the_x(blocks_blue1[i].the_xx() - 32);
        }
    }else if (event.keyCode == 40 && not_on_upper_edge() && running){//move up
        for(var i = 0; i<blocks_blue1.length; i++){
            blocks_blue1[i].the_y(blocks_blue1[i].the_yy() - 32);
        }
    }else if(event.keyCode == 38 && not_on_lower_edge() && running){// move down
        for(var i = 0; i<blocks_blue1.length; i++){
            blocks_blue1[i].the_y(blocks_blue1[i].the_yy() + 32);
        }
    }else if (event.keyCode == 32 && running){ // space key, place down the moving block
        if(can_place_down()){
            for(var i = 0; i<blocks_blue1.length; i++){
                the_blue_blocks.push(new Blocks_blue(blocks_blue1[i].the_xx(), blocks_blue1[i].the_yy()));
                score++;
            }
            block_sound.play();
            clear_blue_array();
            generate_blue();
            whole_row();
        }else {
            error_sound.play();
        }
    }else if (event.keyCode == 83){ // press s key to start or restart
        running = true; // enables other key functions
        score = 0;
        two_min = 10000;
        document.getElementById("plus_time").style.visibility = "hidden";
        clearInterval(unseen_time);
        blocks_blue1 = [];
        the_blue_blocks = [];
        countDownDate = new Date().getTime();
        unseen_timer();
        generate_blue();
    }
}

function unseen_timer(){ //updates time and score 
    final_time = new Date().getTime() + 61000; // timer is set to 61 seconds instead of 60 due to a delay in the display of timer on the screen
    init_time = new Date().getTime();
    two_min = final_time - init_time;          
    seconds = 60;
    document.getElementById("the_score").style.visibility = "visible";
    document.getElementById("plus_time").style.visibility = "hidden";
    
    unseen_time = setInterval(function(){ //timer and score updates every 1/100 second
        
        document.getElementById("the_score").innerHTML = " Score: " + score;
        init_time = new Date().getTime();
        if(score>=128 || two_min<500){ // either win or lose, the program will come to a stop
            document.getElementById("the_score").innerHTML = " Score: " + score;
            extra_time = 0;
            win_sec = seconds;
    
            var call_win = setTimeout(function(){ //the delay in calling win() function is due to the need to update the score before the program stops running
                win();
            }, 11);
            
            return;
        }
        if(extra_time>0){ //shows extra time awarded for clearing rows and/or columns for 2.5 seconds
            document.getElementById("plus_time").style.visibility = "visible"; 
            final_time += extra_time;
            very_extra_time = extra_time/1000;
            extra_time = 0;
            setTimeout(function(){
                    document.getElementById("plus_time").style.visibility = "hidden";
            }, 2500);
        }
        two_min = final_time - init_time;
        seconds = Math.floor((two_min) / 1000);
        document.getElementById("the_time").innerHTML = seconds;
        document.getElementById("plus_time").innerHTML = "+" + very_extra_time + " seconds";
        
    }, 10);

}


function win(){ // checks if win or lose, and displays messages accordingly
    clearTimeout(call_win);
    clearInterval(unseen_time);
    running = false; //paralyze keys functions
    document.getElementById("plus_time").style.visibility = "hidden";
    
    if (score >= 128 && win_sec <= heigh_time){ // win, but did not get a better time
        winn.play(); //sound file name
        alert("YOU WON! With " + win_sec + " seconds left! Good Job! \nPress s key to play AGAIN!");
    }
    if(score >= 128 && win_sec > heigh_time){ // win and achieve best time
        winn.play();
        heigh_time = win_sec;
        document.getElementById("heighest_time").innerHTML = "Your Best Time: " + heigh_time + " Seconds &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
        alert("YOU WON! AND ACHIEVED THE BEST TIME! \nWith " + heigh_time + " seconds left!");
    }
    
    if (score <128 && score>0){ //lost, display restart message
        lose.play();
        alert( score + " points, not Bad! But YOU LOST. \nPress s key to TRY AGAIN!");
        score = -1;
    }
    if (score == 0 && two_min<500){ // did not play
        lose.play();
        alert ("Press s key to restart");
    }
    
    score = -1;
    very_extra_time = 0;
    document.getElementById("the_score").style.visibility = "hidden";
    return;
}


function start(){ 
    display = document.getElementById("display");
    ctx = display.getContext("2d");
    block_sound = document.getElementById("s1");
    ten_block_sound = document.getElementById("s2");
    error_sound = document.getElementById("error3");
    Blocks_gray.load_sprite();
    Blocks_blue.load_sprite();
    Blocks_green.load_sprite();
    generate_background();
    
    not_on_left_edge();
    not_on_lower_edge();
    not_on_right_edge();
    not_on_upper_edge();
    can_place_down();
    
    document.onkeydown = key_pressed;
    window.requestAnimationFrame(run);
    document.getElementById("heighest_time").innerHTML = "Your best time: " + heigh_time + " Seconds &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
}



function run() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,display.width, display.height);
    
    for (i in blocks_gray){
        blocks_gray[i].draw_blocks();
    }
    for(i in the_blue_blocks){
        the_blue_blocks[i].draw_blocks();
    }
    for(i in blocks_blue1){
        blocks_blue1[i].draw_blocks();
    } 
    window.requestAnimationFrame(run);   
}