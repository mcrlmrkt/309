var time = 60,
    score = 0,
    interval,
    win = false;

var hs_1 = localStorage.getItem("highscore1"), // level 1 high score
    hs_2 = localStorage.getItem("highscore2"); // level 2 high score

var game_play = 0, game_over = 0;

var bee_score = 1, 
    ladybug_score = 3, 
    ant_score = 5;

var food_type = "food", bug_type = "bug";

var canvas,
    context,
    num_foods = 0;

var int;

//our canvas for drawing food
var canvas_food = document.getElementById("viewport");
var context_food = canvas_food.getContext("2d");
//our canvas for drawing bug
var canvas_bug = document.getElementById("viewport_bugs");
var context_bug = canvas_bug.getContext("2d");

//Make an array of bugs with 3 ladybugs and ants and 4 bees (for probability)
var ladybug = new Image(),
    ant = new Image(),
    bee = new Image();


ladybug.crossOrigin="anonymous";
ant.crossOrigin="anonymous";
bee.crossOrigin="anonymous";

ladybug.src = "https://dl.dropboxusercontent.com/s/0qle40cjndr99h6/ladybug.png?dl=0";
ant.src = "https://dl.dropboxusercontent.com/s/a9olz98gd0o9za5/ant.png?dl=0";
bee.src = "https://dl.dropboxusercontent.com/s/89vyr3p4h0d5ti9/bee.png?dl=0";
bugs = [ladybug, ladybug, ladybug, ant, ant, ant, bee, bee, bee, bee];

var bugs_id_array = []; // remove id if bug dies
var bugs_id = 0; //unique id for each bug
var num_bugs = 0; //number of bugs added and removed

var foods_id = ['banana', 'cupcake', 'apple', 'burger', 'donut']; //remove id if food eaten
var food_x = [];
var food_y = [];
var num_foods;

//Level identifier
var level = 0;

window.onload = function(){
    document.getElementById("hs1").style.display = "none";
    document.getElementById("hs2").style.display = "none";
    document.getElementById("hs1").innerHTML = hs_1;
    document.getElementById("hs2").innerHTML = hs_2;
    enter_foods();
}

function enter_foods() {
    var banana = new Image();
    var cupcake = new Image();
    var apple = new Image();
    var burger = new Image();
    var donut = new Image();
    banana.src = "banana.png";
    cupcake.src = "cupcake.png";
    apple.src = "apple.png";
    burger.src = "burger.png";
    donut.src = "donut.png";
    var foods = [banana, cupcake, apple, burger, donut]; //array of food

    var y, x;

    for (var i=0;i<5;i++){
        num_foods++;
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
        if (time == 0){
            check_win();
            clearInterval(int);
            update_hs();
            score_popup();
            if (win == true){
                document.getElementById("win").style.display = "block";
                           game_play = 0;
                           game_over = 1;
            } else {
                 document.getElementById("lose").style.display = "block";
                           game_play = 0;
                           game_over = 1;
            }
        } else {
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
        enter_foods();
        load_bugs();
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
    clearInterval(interval); //clear the timer
    update_hs(); //update highscore
    start(); //start game

    document.getElementById("score").innerHTML = 'score:'+score; //update score on screen
    document.getElementById("win").style.display = 'none'; //hide popup win
    document.getElementById("lose").style.display = 'none'; //hide popup lose

    //clear the screen of all bugs
    for (var i=0; i < bugs_id_array.length; i++){
        var elt = document.getElementById(bugs_id_array[i]);
        delete document.body.elt;
        document.body.removeChild(elt);
    }
    bugs_id_array = []; //reset bugs in the screen
    game_over = 0;
}

function exit(){
    window.location.reload(); //refresh page
    update_hs(); //update high score
}

function pause_game() {
    clearTimeout(interval);
    clearInterval(int);
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
    var random = ((parseInt(Math.random() * 2000)) + 1000);
    console.log("random is "+random);
    int = setInterval(enter_bugs, random);
}

function enter_bugs() {
    var i = parseInt(Math.random() * 10); //random integer
    var x = (Math.floor((Math.random() * 370))+10);
    bug = ['ladybug','ladybug','ladybug','ant','ant','ant','bee','bee','bee','bee'];

    var canvas = document.getElementById('viewport_bugs');
    var context = canvas.getContext("2d");
    num_bugs++;
    
    if (bugs[i].complete) { //image loaded
        context.drawImage(bugs[i], x, 0, 20, 20);
        clearInterval(int);
        move_bug();
        load_bugs();
    }
    else {
        bugs[i].onload = function() {
            context.drawImage(bugs[i], x, 0, 20, 20);
            clearInterval(int);
            move_bug();
            load_bugs();
        }
    }
}

function move_bug() {

}


function check_win(){
    var num_foods = foods_id.length;
    if (num_foods == 0){
        win = false;
    } else {
        win = true;
    }
}

function closest_food(bug_position) {
    //console.log("in closest food");
    for (var f=0; f<foods_id.length; f++) {
        //console.log("food length is  "+foods_id.length);
        var food_elt = document.getElementById(foods_id[f]);
        var food_position = position(food_elt); //get position for each food
        //console.log("foods_id at f "+f+" is "+foods_id[f]);
        //console.log("food is at x= "+food_position.x+" y="+food_position.y);
        
        //if both position are the same, then remove food from foods_id
        if (bug_position.x == food_position.x && bug_position.y == food_position.y) {
            remove_elt(food_elt, foods_id, foods_id[f], food_type);
            num_foods--;//decrease total num of food.
            f--;
        }
        else { // calculate the distance between bug and food and store in food_distance
            food_distance.push(calculate_distance(bug_position, food_position));
        }
    }
    return min_distance_id(food_distance); //return the closest food id eg burger
    
}


function calculate_distance(bug_position, food_position) {
    var x1 = bug_position.x;
    var y1 = bug_position.y;
    var x2 = food_position.x;
    var y2 = food_position.y;
    
    var distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    //console.log("distance is "+distance);
    return distance;
}

function min_distance_id() {
    if (food_distance.length == 1) {
        return foods_id[0];
    }
    
    else {
        var curr = 0
        for (var i=1; i<food_distance.length; i++) {
            if (food_distance[curr] > food_distance[i]) {
                curr = i;
            }
        }
        return foods_id[curr];
    }
    context.drawImage(img, (Math.floor((Math.random() * 370))+1),40, 20, 20);
    console.log("drawImage "+canvas+" "+context);
    document.body.appendChild(canvas);  
}

canvas_bug.addEventListener('mousedown', kill_bugs, false);

function kill_bugs(event) {
    if (game_play == 1) {
        var x = event.x;
        var y = event.y;
        x-=30;
        y-=30;
        update_score(x-30, y-30);
        context_bug.clearRect(x-30, y-30, 400, 600);
        console.log("x:" + x + " y:" + y);
    }
}

function update_score(x, y){
    var ctx = canvas_bug.getContext("2d");
    var imgData = ctx.getImageData(x+25, y+20, 30, 30).data;
    var colour = colour_value(imgData);
    console.log("red is "+colour.red+" blue is "+colour.blue+" green is "+colour.green);
    
    if (colour.red > 20 && colour.green > 30) { //bee
        score+=bee_score;
    }
    else if (colour.red > 20) { //ladybug
        score+=ladybug_score;
    }
    else { //ant
        score+=ant_score;
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
