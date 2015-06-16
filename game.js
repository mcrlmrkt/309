var ladybug = new Image(),
    ant = new Image(),
    bee = new Image(),
    bugs = [ladybug, ant, bee],
    time = 60,
    score = 0,
    interval,
    win = fault;

function load_foods() {
    //Create an array of food to be placed randomly in the screen
    var banana = new Image();
    var cupcake = new Image();
    var apple = new Image();
    var burger = new Image();
    var donut = new Image();
    var foods = [banana, cupcake, apple, burger, donut]; //array of food
    var food = ['banana', 'cupcake', 'apple', 'burger', 'donut'];
    
    for (var i=0; i < 4; i++){
        canvas = document.getElementById(food[i]);
        foods[i].src= food[i] + ".png";
        
        foods[i].onload = function() {

            if (j < 4) {
                foods = [banana, cupcake, apple, burger, donut]; //array of food
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
    var display = document.querySelector('#timer'),
        countdown = document.getElementById("timer");
    interval = setInterval(function(){
        if (time == 0){
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
    document.getElementById("home_page").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("menu_bar").style.display = "block";
    timer();
    load_foods();
    load_bugs();
}

function pause_game() {
    clearTimeout(interval);
    document.getElementById("paused").style.display = "block";
}

function resume_game(){
    timer();
    document.getElementById("paused").style.display = "none";
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

// if level one is selected is_1=1
var is_1 = 0;
// if level two is selected is_2=2
var is_2 = 0;

function clicked_1() {
    is_1 = is_1+1;
    var level = document.getElementById("level1");
    level.style.color = "#fff1a9";
    is_2 = 0;
    unclicked_2();
}

function unclicked_1() {
    var level = document.getElementById("level1");
    level.style.color = "#373947";
}

function clicked_2() {
    is_2 = is_2+1;
    var level = document.getElementById("level2");
    level.style.color = "#fff1a9";
    is_1 = 0;
    unclicked_1();
}

function unclicked_2() {
    var level = document.getElementById("level2");
    level.style.color = "#373947";
}

