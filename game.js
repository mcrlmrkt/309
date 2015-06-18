var time = 60,
    score = 0,
    interval,
    win = false;

var canvas,
    context,
    j=0; //for load_foods
var food = ['banana', 'cupcake', 'apple', 'burger', 'donut'];

var int;

var bugs_img = []; // for load_bugs
var bugs_id = []; // remove id if bug dies
var num_bugs = 0; //number of bugs added

var food_distance = []; //all food available on the board distances wrt a bug
var foods_id = []; //remove id if food eaten

//Level 1 variables
var is_1 = 0; // if level one is selected is_1=1
var hs_1 = 0; // level 1 high score

//Level 2 variable
var is_2 = 0; // if level two is selected is_2=1
var hs_2 = 0; // level 2 high score

function load_foods() {
    for (var i =0; i<5; i++) {
        enter_foods(i);
    }
}

var num_foods=0;
function enter_foods(i) {
    var banana, cupcake, apple, burger, donut;
    var foods = [banana, cupcake, apple, burger, donut]; //array of food
    var food = ['banana', 'cupcake', 'apple', 'burger', 'donut'];
    var y = (Math.floor((Math.random() * 540)) + 1);
    var x = (Math.floor((Math.random() * 260))+10);
    foods[i] = new Image();
    foods_id.push(foods[i]);
    foods[i].src = food[i] + ".png";
    var canvas = document.getElementById(food[i]);
    num_foods++;
    var context = canvas.getContext("2d");
    context.strokeStyle = 'black';
    
    foods[i].onload = function() {
        console.log("i is "+i);
        console.log("x is "+x+" y is "+y);
        context.drawImage(foods[i], x, y, 20, 20);
        
    }
}

function timer() {
    var display = document.querySelector('#timer');
    interval = setInterval(function(){
        if (time == 0){
            clearInterval(int);
            check_win();
            if (win == true){
                document.getElementById("win").style.display = "block";
            } else {
                 document.getElementById("lose").style.display = "block";
            }
        } else {
            time--;
            display.textContent = time + 'sec';
        }
    }, 1000);
}

function start() {
    //check if a level is selected
    if (is_1 == 1 || is_2 == 1) {
        document.getElementById("home_page").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("menu_bar").style.display = "block";
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

function pause_game() {
    clearTimeout(interval);
    clearInterval(int);
    document.getElementById("paused").style.display = "block";
}

function resume_game(){
    timer();
    load_bugs();
    document.getElementById("paused").style.display = "none";
}

function load_bugs() {
    var random = ((parseInt(Math.random() * 2000)) + 1000);
    console.log("random is "+random);
    int = setInterval(enter_bugs, random);
}

function enter_bugs() {
    var ladybug, ant, bee;
    var i = parseInt(Math.random() * 3); //random integer
    var x = (Math.floor((Math.random() * 260))+10);
    bugs = [ladybug, ant, bee]; //array of bug
    bug = ['ladybug', 'ant', 'bee'];
    
    bugs[i] = new Image();
    bugs_img.push(bugs[i]);
    bugs[i].src = bug[i] + ".png";
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', num_bugs);
    bugs_id.push(num_bugs);
    num_bugs++;
    canvas.style.position = "absolute";
    canvas.style.width = "389px";
    var context = canvas.getContext("2d");
    
    if (bugs[i].complete) { //image loaded
        context.drawImage(bugs[i], x, 40, 20, 20);
        document.body.appendChild(canvas);
        clearInterval(int);
        move_bug();
        load_bugs();
    }
    else {
        bugs[i].onload = function() {
            context.drawImage(bugs[i], x, 40, 20, 20);
            document.body.appendChild(canvas);
            clearInterval(int);
            move_bug();
            load_bugs();
        }
    }
}

function move_bug() {
    console.log("in move_bug");
    for (var b=0; b<bugs_id.length; b++) {
        console.log("there are "+bugs_id[b]);
        var bug_elt = document.getElementById(bugs_id[b]);
        var bug_position = position(bug_elt);
        console.log("bug "+b +"is at x= "+bug_position.x+" y="+bug_position.y);
        var closest_id = closest_food(bug_position); //id of the closest food
        
        food_distance = []; //clear food distance array
        
        // TODO
        // move to the food determined by closest_id
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
    console.log("in closest food");
    for (var f=0; f<foods_id.length; f++) {
        console.log("food length is  "+foods_id.length);
        var food_elt = document.getElementById(food[f]);
        var food_position = position(food_elt); //get position for each food
        console.log("food is at x= "+food_position.x+" y="+food_position.y);
        // calculate the distance between bug and food
        food_distance.push(calculate_distance(bug_position, food_position));
        
        // TODO
        //if both position are the same, then remove food from food_id
        //decrease total num of food.
    }
    
    return min_distance_id(food_distance);
    
}

// TODO fix this function
function position(elt) {
    console.log("in position");
    var x = 0;
    var y = 0;
    
    while (elt) {
        x += (elt.clientLeft + elt.offsetLeft - elt.scrollLeft);
        y += (elt.clientTop + elt.offsetTop - elt.scrollTop);
        console.log("to and bottom are "+x+" "+y);
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
    console.log("distance is "+distance);
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

function clicked_1() {
    is_1 = 1;
    var level = document.getElementById("level1");
    level.style.color = "#fff1a9";
    is_2 = 0;
    unclicked_2();
    display_hs();
}

function unclicked_1() {
    var level = document.getElementById("level1");
    level.style.color = "#373947";
}

function clicked_2() {
    is_2 = 1;
    var level = document.getElementById("level2");
    var board = document.getElementById("board");
    level.style.color = "#fff1a9";
    board.style.backgroundColor = "#F8DDD7";
    is_1 = 0;
    unclicked_1();
    display_hs();
}

function unclicked_2() {

    var level = document.getElementById("level2");
    level.style.color = "#373947";
}

function display_hs() {
    var hs = document.getElementById("high_score");
    if (is_1 == 1) {
        hs.style.fontSize = "30px";
        hs.innerHTML = hs_1;
    }
    else if (is_2 == 1) {
        hs.style.fontSize = "30px";
        hs.innerHTML = hs_2;
    }
}
