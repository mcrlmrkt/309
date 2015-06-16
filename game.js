// Game page variable
var time = 60;

var canvas; // for load_foods
var context;
var j=0;

var int;

var bugs_img = []; // for load_bugs
var num_bugs = 0; //number of bugs added

//Level 1 variables
var is_1 = 0; // if level one is selected is_1=1
var hs_1 = 0; // level 1 high score
var curr_hs_1 = 0;

//Level 2 variable
var is_2 = 0; // if level two is selected is_2=1
var hs_2 = 0; // level 2 high score
var curr_hs_2 = 0;

// Game Page

function gameLoad() {
    load_foods();
    load_bugs();
}

function load_foods() {
    //Create an array of food to be placed randomly in the screen
    var banana = new Image();
    var cupcake = new Image();
    var apple = new Image();
    var burger = new Image();
    var foods = [banana, cupcake, apple, burger]; //array of food
    var food = ['banana', 'cupcake', 'apple', 'burger'];
    
    for (var i=0; i < 4; i++){
        canvas = document.getElementById(food[i]);
        foods[i].src= food[i] + ".png";
        
        foods[i].onload = function() {

            if (j < 4) {
                foods = [banana, cupcake, apple, burger]; //array of food
                context = canvas.getContext("2d");
                context.drawImage(foods[j], (Math.floor((Math.random() * 370))+1),
                                  (Math.floor((Math.random() * 540))+1),
                                  20, 20);
                j++;
            }
        };
    }
}

function timer() {
    var timer = setInterval(function() {
    document.getElementById("timer").innerHTML(time--);
    if(time == 1) clearInterval(timer);
    }, 1000).toString();
}

function load_bugs() {
    int = setInterval(enter_bugs, 3000);
}

function enter_bugs() {
    var ladybug;
    var ant;
    var bee;
    bugs = [ladybug, ant, bee]; //array of bug
    bug = ['ladybug', 'ant', 'bee'];
    var i = parseInt(Math.random() * 3); //random integer
    console.log("i is "+i);
    img = new Image();
    bugs_img.push(img);
    console.log("bugs img is "+bugs_img[num_bugs]);
    img.src = bug[i] + ".png";
    console.log("bug i is "+bug[i]);
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', num_bugs);
    console.log("num_bugs is "+num_bugs);
    num_bugs = num_bugs + 1;
    //canvas.style.height = "563px";
    //canvas.style.width = "388px";
    var context = canvas.getContext("2d");
    context.drawImage(img, (Math.floor((Math.random() * 380))+10),10, 10, 40);
    console.log("drawImage "+canvas+" "+context);
    document.body.appendChild(canvas);

}

// Index Page

function pageLoad() {
    document.getElementById("level1").onclick = clicked_1;
    document.getElementById("level2").onclick = clicked_2;
}

function clicked_1() {
    console.log("in clicked_1");
    is_1 = is_1+1;
    console.log(is_1);
    this.style.color = "#fff1a9";
    is_2 = 0;
    unclicked_2();
    display_hs();
}

function unclicked_1() {
    console.log("in unclicked_1");
    var level = document.getElementById("level1");
    level.style.color = "#373947";
}

function clicked_2() {
    console.log("in clicked_2");
    is_2 = is_2+1;
    console.log(is_2);
    this.style.color = "#fff1a9";
    is_1 = 0;
    unclicked_1();
    display_hs();
}

function unclicked_2() {
    console.log("in unclicked_2");
    var level = document.getElementById("level2");
    level.style.color = "#373947";
}

function display_hs() {
    console.log("in display hs");
    console.log(is_1);
    console.log(is_2);
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

// updating the high score
function update_hs_1() {
    if (hs_1 <= curr_hs_1) {
        hs_1 = curr_hs_1;
    }
    curr_hs_1 = 0; //reset
}

function update_hs_2() {
    if (hs_2 <= curr_hs_2) {
        hs_2 = curr_hs_2;
    }
    curr_hs_2 = 0; //reset
}