var time = 60,
    score = 0,
    interval,
    win = false;

var canvas,
    context,
    j=0; //for load_foods

var int;

var bugs_img = []; // for load_bugs
var num_bugs = 0; //number of bugs added

//Level 1 variables
var is_1 = 0; // if level one is selected is_1=1
var hs_1 = 0; // level 1 high score

//Level 2 variable
var is_2 = 0; // if level two is selected is_2=1
var hs_2 = 0; // level 2 high score

function load_foods() {
    //Create an array of food to be placed randomly in the screen
    console.log("in load foods");
    var banana = new Image();
    var cupcake = new Image();
    var apple = new Image();
    var burger = new Image();
    var donut = new Image();
    var foods = [banana, cupcake, apple, burger, donut]; //array of food
    var food = ['banana', 'cupcake', 'apple', 'burger', 'donut'];
    
    for (var i=0; i < 5; i++){
        console.log("i is "+ i);
        console.log("foods i is "+food[i]);
        foods[i].src= food[i] + ".png";
        
        foods[i].onload = function() {

            if (j < 5) {
                console.log("j is "+j);
                foods = [banana, cupcake, apple, burger, donut]; //array of food
                food = ['banana', 'cupcake', 'apple', 'burger', 'donut'];
                canvas = document.getElementById(food[j]);
                console.log("canvas is "+canvas);
                context = canvas.getContext("2d");
                console.log("context is "+context);
                context.drawImage(foods[j], (Math.floor((Math.random() * 370))+1),
                                  (Math.floor((Math.random() * 540)) + 1),
                                  20, 20);
                j++;
            }
        };
    }
}

function timer() {
    var display = document.querySelector('#timer'),
        countdown = document.getElementById("timer");
    interval = setInterval(function(){
        if (time == 0){
            if (win == true){
                document.getElementById("win").style.display = "block";
            } else {
                 document.getElementById("lose").style.display = "block";
            }
                           clearInterval(int);
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
    var ladybug;
    var ant;
    var bee;
    bugs = [ladybug, ant, bee]; //array of bug
    bug = ['ladybug', 'ant', 'bee'];
    var i = parseInt(Math.random() * 3); //random integer
    var x = (Math.floor((Math.random() * 260))+10);
    console.log("x is "+x);
    console.log("i is "+i);
    bugs[i] = new Image();
    bugs_img.push(bugs[i]);
    console.log("bugs img is "+bugs_img[num_bugs]);
    bugs[i].src = bug[i] + ".png";
    console.log("bug i is "+bug[i]);
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', num_bugs);
    console.log("num_bugs is "+num_bugs);
    num_bugs++;
    canvas.style.position = "absolute";
    //canvas.style.height = "600px";
    canvas.style.width = "389px";
    var context = canvas.getContext("2d");
    
    if (bugs[i].complete) { //image loaded
        console.log("in complete bugs i is "+bugs[i]);
        console.log("x is "+x);
        context.drawImage(bugs[i], x, 40, 20, 20);
        document.body.appendChild(canvas);
        clearInterval(int);
        load_bugs();
    }
    else {
        bugs[i].onload = function() {
            console.log("in onload bugs i is "+bugs[i]);
            console.log("x is "+x);
            context.drawImage(bugs[i], x, 40, 20, 20);
            document.body.appendChild(canvas);
            clearInterval(int);
            load_bugs();
        }
    }
}

function clicked_1() {
    console.log("in click 1");
    is_1 = 1;
    var level = document.getElementById("level1");
    level.style.color = "#fff1a9";
    is_2 = 0;
    unclicked_2();
    display_hs();
}

function unclicked_1() {
    console.log("in unclick 1");
    var level = document.getElementById("level1");
    level.style.color = "#373947";
}

function clicked_2() {
    console.log("in click 2");
    is_2 = 1;
    var level = document.getElementById("level2");
    level.style.color = "#fff1a9";
    is_1 = 0;
    unclicked_1();
    display_hs();
}

function unclicked_2() {
    console.log("in unclick 2");
    var level = document.getElementById("level2");
    level.style.color = "#373947";
}

function display_hs() {
    console.log("in display hs");
    console.log("1 is "+is_1);
    console.log("2 is"+is_2);
    var hs = document.getElementById("high_score");
    if (is_1 == 1) {
        console.log("in display hs1");
        hs.style.fontSize = "30px";
        hs.innerHTML = hs_1;
    }
    else if (is_2 == 1) {
        console.log("in display hs2");
        hs.style.fontSize = "30px";
        hs.innerHTML = hs_2;
    }
}
