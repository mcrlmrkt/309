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
    food = ['banana', 'cupcake', 'apple', 'burger', 'donut'],
    num_foods = 0;

var int;

//Make an array of bugs with 3 ladybugs and ants and 4 bees (for probability)
var ladybug = new Image(),
    ant = new Image(),
    bee = new Image();
ladybug.src = 'ladybug.png';
ant.src = 'ant.png';
bee.src = 'bee.png';
bugs = [ladybug, ladybug, ladybug, ant, ant, ant, bee, bee, bee, bee];

var bugs_id_array = []; // remove id if bug dies
var bugs_id = 0; //unique id for each bug
var num_bugs = 0; //number of bugs added and removed

var food_distance = []; //all food available on the board distances wrt a bug
var foods_id = []; //remove id if food eaten

//Level identifier
var level = 0;

window.onload = function(){
    document.getElementById("hs1").style.display = "none";
    document.getElementById("hs2").style.display = "none";
    document.getElementById("hs1").innerHTML = hs_1;
    document.getElementById("hs2").innerHTML = hs_2;
}

function load_foods() {
    for (var i =0; i<5; i++) {
        enter_foods(i);
    }
}

function enter_foods(i) {
    var banana, cupcake, apple, burger, donut;
    var foods = [banana, cupcake, apple, burger, donut]; //array of food
    var y = (Math.floor((Math.random() * 420)) + 100);
    var x = (Math.floor((Math.random() * 260))+10);
    foods[i] = new Image();
    foods_id[i]=food[i];
    foods[i].src = food[i] + ".png";
    var canvas = document.getElementById(food[i]);
    num_foods++;
    var context = canvas.getContext("2d");
    
    foods[i].onload = function() {
        canvas.style.left = x+"px";
        canvas.style.top = y+"px";
        console.log("i is "+i+" food id "+food[i]);
        console.log("x is "+x+" y is "+y);
        context.drawImage(foods[i], 0.5, 0.5, 20, 20);
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
            if (win == true){ //foods_id.length > 0 (there are still food left)
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
        load_foods();
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

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', (bug[i]+bugs_id));
    bugs_id_array.push(bug[i]+bugs_id);
    //bugs_type.push(bug[i]);
    num_bugs++;
    bugs_id++;
    canvas.style.position = "absolute";
    canvas.style.width = "30px";
    canvas.style.height = "30px";
    var context = canvas.getContext("2d");
    
    if (bugs[i].complete) { //image loaded
        canvas.style.left = x+"px";
        canvas.style.top = "40px";
        context.drawImage(bugs[i], 0, 0, 130, 120);
        document.body.appendChild(canvas);
        clearInterval(int);
        move_bug();
        load_bugs();
    }
    else {
        bugs[i].onload = function() {
            canvas.style.left = x+"px";
            canvas.style.top = "40px";
            context.drawImage(bugs[i], 0, 0, 130, 120);
            document.body.appendChild(canvas);
            clearInterval(int);
            move_bug();
            load_bugs();
        }
    }
}

//todo
function move_bug() {
    console.log("in move_bug");
    for (var b=0; b<bugs_id_array.length; b++) {
        var bug_elt, bug_position, closest_food_id, food_elt, food_position, ctx;
        //console.log("there are "+bugs_id_array[b]);
        bug_elt = document.getElementById(bugs_id_array[b]); //canvas for bug
        bug_position = position(bug_elt);
        //console.log("bug "+b +"is at x= "+bug_position.x+" y="+bug_position.y);
        closest_food_id = closest_food(bug_position); //id of the closest food
        console.log("closest food is "+closest_food_id);
        food_distance = []; //clear food distance array
        food_elt = document.getElementById(closest_food_id);
        food_position = position(food_elt); // get position of closest food to move to it
        
        ctx = bug_elt.getContext("2d");
        ctx.moveTo(food_position.x, food_position.y); //move bug to closest food
        
    }
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

function position(elt) {
    console.log("in position");
    var x = 0;
    var y = 0;
    
    while (elt) {
        
        x += (elt.clientLeft + elt.offsetLeft - elt.scrollLeft);
        y += (elt.clientTop + elt.offsetTop - elt.scrollTop);
        //console.log("to and bottom are "+x+" "+y);
        elt = elt.offsetParent;
    }
    return { x: x, y: y};
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

document.addEventListener('click', function(e) {
    if (game_play == 1) { //mouse is clickable only when status of game is play.
        var id_clicked = e.target.id;
        console.log("clicked "+id_clicked);
        if (bugs_id_array.indexOf(id_clicked) != -1) { //a bug was clicked
            var bug_elt = document.getElementById(id_clicked);
            remove_elt(bug_elt, bugs_id_array, id_clicked, bug_type);
        } // else do nothing
    }
});

function remove_elt(elt, array, id, type) { //type is either "food" or "bug_type";
    console.log("in remove elt, type is "+type);
    // remove canvas
    delete document.body.elt;
    
    if (type == "bug") {
        console.log("it is a bug with id "+id);
        document.body.removeChild(elt);
        //need to update curr high score first
        //check first letter of id
        var first_char = id.substring(0, 1);
        
        if (first_char == "b") { //bee
            score+=bee_score;
        }
        else if (first_char == "l") { //ladybug
            score+=ladybug_score;
        }
        else { //ant
            score+=ant_score;
        }
        document.getElementById("score").innerHTML="score:"+score;
        document.getElementById("score").style.fontSize = "25px";
        console.log("score is "+score);
    }
    
    var index = array.indexOf(id);
    
    if (index != -1) {
        array.splice(index, 1);
    }
    
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
