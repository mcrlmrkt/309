var time = 60,
    score = 0,
    interval,
    win = false;

var hs_1 = localStorage.getItem("highscore1"), // level 1 high score
    hs_2 = localStorage.getItem("highscore2"); // level 2 high score

var game_play = 0, game_over = 0;

var food_type = "food", bug_type = "bug";

var canvas,
    context;

var int,
    moving;

//our canvas for drawing food
var canvas_food = document.getElementById("viewport");
var context_food = canvas_food.getContext("2d");
//our canvas for drawing bug
var canvas_bug = document.getElementById("viewport_bugs");
var context_bug = canvas_bug.getContext("2d");

//Make and array of food, preloaded
var banana = new Image();
var cupcake = new Image();
var apple = new Image();
var burger = new Image();
var donut = new Image();
banana.src = 'banana.png';
cupcake.src = 'cupcake.png';
apple.src = 'apple.png';
burger.src = 'burger.png';
donut.src = 'donut.png';
var foods = [banana, cupcake, apple, burger, donut]; //array of food


//Make an array of bugs with 3 ladybugs and ants and 4 bees (for probability)
var ladybug = new Image(),
    ant = new Image(),
    bee = new Image();
ladybug.crossOrigin="anonymous";
ant.crossOrigin="anonymous";
bee.crossOrigin="anonymous";

ladybug.src = "https://dl.dropboxusercontent.com/s/nvxqd82lqem8hv9/ladybug.png?dl=0";
ant.src = "https://dl.dropboxusercontent.com/s/bwe0oeqyoc6fvp9/ant.png?dl=0";
bee.src = "https://dl.dropboxusercontent.com/s/ibozg4mfpld1q4a/bee.png?dl=0";
bugs = [ladybug, ladybug, ladybug, ant, ant, ant, bee, bee, bee, bee];

var bugs_id_array = []; // remove id if bug dies
var bugs_id = 0; //unique id for each bug
var num_bugs = 0; //number of bugs added and removed

var foods_id = ['banana', 'cupcake', 'apple', 'burger', 'donut']; //remove id if food eaten
var food_x = [];
var food_y = [];
var num_foods = 5;

//Level identifier
var level = 0;

window.onload = function(){
    document.getElementById("hs1").style.display = "none";
    document.getElementById("hs2").style.display = "none";
    document.getElementById("hs1").innerHTML = hs_1;
    document.getElementById("hs2").innerHTML = hs_2;
};

function enter_foods() {
    var y, x;

    for (var i=0;i<5;i++){
        y = (Math.floor((Math.random() * 420)) + 100);
        x = (Math.floor((Math.random() * 260))+10);
        context_food.drawImage(foods[i], x, y, 20, 20);
        food_y.push(y);
        food_x.push(x);
        console.log(foods_id[i]+" is at x "+food_x[i]+" and at y "+food_y[i]);
    }
}

function timer() {
    var display = document.querySelector('#timer'); 
    interval = setInterval(function(){
        if (time == 0 || game_over == 1){
            check_win();
            clearInterval(int);
            clearTimeout(moving);
            update_hs();
            score_popup();
            if (win == true){ //foods_id.length > 0 (there are still food left)
                document.getElementById("win").style.display = "block";
                           game_play = 0;
                           game_over = 1;
            } else {
                 document.getElementById("lose").style.display = "block";
                           game_play = 0;
                           game_over = 1;
            }
        } else if (game_over == 0){
            time--;
            display.textContent = time + 'sec';
        }
    }, 1000);
}

function start() {
    document.getElementById("score").innerHTML = 'score:'+score;
    //check if a level is selected
    if (level != 0) {
        document.getElementById("board").style.display = "block";
        document.getElementById("home_page").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("menu_bar").style.display = "block";
        game_play = 1;
        timer();
        load_bugs();
        enter_foods();
    }
    else {
        document.getElementById("pick_level").style.display = "block";
        var pick_level = setTimeout(function(){
            document.getElementById("pick_level").style.display = "none";
            }, 2000);
    }
}

function restart(){
    time = 60; //reset time
    score = 0; //reset score
    context_food.clearRect(0, 0, 400, 600);
    context_bug.clearRect(0, 0, 400, 600);
    num_foods = 5;
    food_x = [];
    food_y = [];
    clearInterval(interval); //clear the timer
    update_hs(); //update highscore
    start(); //start game
    load_bugs();

    document.getElementById("score").innerHTML = 'score:'+score; //update score on screen
    document.getElementById("win").style.display = 'none'; //hide popup win
    document.getElementById("lose").style.display = 'none'; //hide popup lose
    
    game_over = 0;
}

function exit(){
    window.location.reload(); //refresh page
    update_hs(); //update high score
}

function pause_game() {
    clearTimeout(interval);
    clearInterval(int);
    clearTimeout(moving);
    if (document.getElementById("pause_button").innerHTML == "PAUSE" && game_over == 0) {
        document.getElementById("pause_button").innerHTML="PLAY";
        game_play = 0;
        document.getElementById("paused").style.display = "block";
    }
    else if (document.getElementById("pause_button").innerHTML == "PLAY" && game_over == 0) {
        document.getElementById("pause_button").innerHTML="PAUSE";
        document.getElementById("paused").style.display = "none";
        resume_game();
    }
}

function resume_game(){
    timer();
    load_bugs();
    game_play = 1;
}

function load_bugs() {
    if (game_over == 0){
        var random = ((parseInt(Math.random() * 2000)) + 1000);
        int = setInterval(enter_bugs, random);
    }
}

function enter_bugs() {
    var i = parseInt(Math.random() * 10); //random integer
    var x = (Math.floor((Math.random() * 370))+10);
    bug = ['ladybug','ladybug','ladybug','ant','ant','ant','bee','bee','bee','bee'];
    var speed = check_speed(bug[i]);
    
    num_bugs++;
    var test = calculate_distance(x, 0);

    if (bugs[i].complete) { //image loaded
        context_bug.drawImage(bugs[i], x, 0, 20, 20);
         console.log("bug is "+ bug[i]);
        clearInterval(int);
        load_bugs();
        move_bug(bugs[i], x, 0, test,speed);
    } else {
        bugs[i].onload = function() {
            context_bug.drawImage(bugs[i], x, 0, 30, 30);
            console.log("bug is "+ bug[i]);
            clearInterval(int);
            load_bugs();
            move_bug(bugs[i], x, 0, test,speed);
        }
    }

    console.log("closest food is "+ foods_id[test]);
    console.log("coords are "+ food_x[test] +","+ food_y[test]);
}

function move_bug(bug, x, y, target, speed){
    var fx = food_x[target];
    var fy = food_y[target];

    context_bug.clearRect(x,y,20,20);
    if (x < fx){
        x++;
    } else if (x > fx){
        x--;
    }
    if (y < fy){
        y++;
    } else if(y > fy){
        y--;
    }

    if (fx == x && fy == y && num_foods > 0){
        context_bug.clearRect(fx,fy,20,20);
        food_eaten(bug, x, y, target, speed);
    } else if(num_foods == 0){
        context_bug.clearRect(fx,fy,20,20);
        end_game();
    }

    context_bug.drawImage(bug, x, y, 20, 20);
        
    if (game_play = 1){    
        moving = setTimeout(function() {move_bug(bug,x,y, target, speed)}, speed);
    }
}

function end_game(){
    console.log("game over")
    check_win();
    clearInterval(int);
    update_hs();
    score_popup();
    if (win == true){ //num_foods > 0 (there are still food left)
        document.getElementById("win").style.display = "block";
                   game_play = 0;
                   game_over = 1;
    } else {
         document.getElementById("lose").style.display = "block";
                   game_play = 0;
                   game_over = 1;
    }
}

function food_eaten(bug, x, y, target, speed){
    var fx = food_x[target];
    var fy = food_y[target];

   if (x == fx && y == fy){
        console.log(foods_id[target] + " is eaten");
        context_food.clearRect(fx,fy,20,20);
        num_foods--;
        console.log(num_foods + " left");
        food_x.splice(target, 1);
        food_y.splice(target, 1);
        foods_id.splice(target, 1);
        context_bug.clearRect(x,y,20,20);
        var target2 = calculate_distance(x, y);
        move_bug(bug, x, y, target2, speed);
    }  else if (x != fx && y != fy){
        move_bug(bug, x, y, target, speed);        
    }
}

function check_speed(bug_id){
    var speed;
    if (level == 1){
        if (bug_id == 'bee') { //bee
            speed = 60;
        }
        else if (bug_id == 'ladybug') { //ladybug
            speed = 50;
        }
        else if (bug_id == 'ant'){ //ant
            speed = 35;
        }
    } else if (level == 2){
        if (bug_id == 'bee') { //bee
            speed = 50;
        } else if (bug_id == 'ladybug') { //ladybug
            speed = 20;
        } else if (bug_id == 'ant'){ //ant
            speed = 5;
        }
    }
    return speed;    
}

function check_win(){
    var num_foods = foods_id.length;
    if (num_foods == 0){
        win = false;
    } else {
        win = true;
    }
}

function calculate_distance(x,y) {
    var distances = [];
    var min, food;
    for (var i=0;i<num_foods;i++){
        var distance = Math.sqrt(Math.pow((x - food_x[i]), 2) + Math.pow((y - food_y[i]), 2));
        distances.push(distance);
    }
    min = Math.min.apply(null, distances);
    food = distances.indexOf(min);

    return food;
}

canvas_bug.addEventListener('mousedown', kill_bugs, false);

function kill_bugs(event) {
    if (game_play == 1) {
        var x = event.x;
        var y = event.y;
        x-=30;
        y-=30;
        update_score(x-30, y-30);
        context_bug.clearRect(x-5, y-30, 60, 60);
        clearTimeout(moving);
        console.log("x:" + x + " y:" + y);
    }
}

function update_score(x, y){
    var ctx = canvas_bug.getContext("2d");
    var imgData = ctx.getImageData(x+25, y+20, 30, 30).data;
    var colour = colour_value(imgData);
    console.log("red is "+colour.red+" blue is "+colour.blue+" green is "+colour.green);
    
    if (colour.blue == 0 && colour.green > 0) { //bee
        score+=1;
    }
    else if (colour.blue == 0 && colour.green == 0 && colour.red > 0) { //ladybug
        score+=3;
    }
    else if (colour.red > 0 &&  colour.blue > 0 && colour.green > 0){ //ant
        score+=5;
    }
    document.getElementById("score").innerHTML="score:"+score;
    console.log("score is "+score);
}

function colour_value(imgData) {
    var total_red = 0, total_green = 0, total_blue = 0;
    for (i=0; i<30*4; i+=4) {
        
        total_red+=imgData[i];
        total_green+=imgData[i+1];
        total_blue+=imgData[i+2];
        
    }
    return { red: Math.floor(total_red/30), green: Math.floor(total_green/30), blue: Math.floor(total_blue/30) };
}

function clicked_1() {
    level = 1;
    var level1 = document.getElementById("level1");
    level1.style.color = "#fff1a9";
    unclicked_2();
    document.getElementById("hs2").style.display = "none";
    document.getElementById("hs1").style.display = "inline-block";
}

function unclicked_1() {
    var level1 = document.getElementById("level1");
    level1.style.color = "#373947";
}

function clicked_2() {
    level = 2;
    var level2 = document.getElementById("level2");
    var board = document.getElementById("board");
    level2.style.color = "#fff1a9";
    board.style.backgroundColor = "#F8DDD7";
    document.getElementById("hs1").style.display = "none";
    document.getElementById("hs2").style.display = "inline-block";
    unclicked_1();
}

function unclicked_2() {
    var level2 = document.getElementById("level2");
    level2.style.color = "#373947";
}

function update_hs() {
    if (level == 1 ) {
        if (hs_1 <= score) {
            localStorage.setItem("highscore1", score);    
        }
    } else if (level == 2) { //level 2
        if (hs_2 <= score) {
            localStorage.setItem("highscore2", score);
        }
    }
}

function score_popup(){
    if (win == true){
        document.getElementsByClassName("hs_popup")[1].innerHTML = "SCORE: " + score;
    } else {
        document.getElementsByClassName("hs_popup")[0].innerHTML = "SCORE: " + score;
    }    
}
