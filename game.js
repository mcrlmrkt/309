var ladybug = new Image();
var ant = new Image();
var bee = new Image();
var bugs = [ladybug, ant, bee];
var time = 60;
var hs_1 = 0; // level 1 high score
var hs_2 = 0; // level 2 high score

// Game Page

function load_images() {
	//Create an array of food to be placed randomly in the screen
	var banana = new Image();
	var cupcake = new Image();
	var apple = new Image();
	var burger = new Image();
	var foods = [banana, cupcake, apple, burger]; //array of food
	var food = ['banana', 'cupcake', 'apple', 'burger'];

	for (var i=0; i < 4; i++){
		var canvas = document.getElementById(food[i]);
		var context = canvas.getContext("2d"); 
		foods[i].src= food[i] + ".png";
		context.drawImage(foods[i], (Math.floor((Math.random() * 370))+1), 
			(Math.floor((Math.random() * 540))+1), 
			20, 20); 
	}
	//Create an array of bugs which can enter the screen at random order
	var bug = ['ladybug', 'ant', 'bee'];

	for (var i=0; i < 4; i++){
		var canvas = document.getElementById(bug[i]);
		var context = canvas.getContext("2d"); 
		bugs[i].src= bug[i] + ".png";
		// 
	}
}

function timer() {
    var timer = setInterval(function() {
    document.getElementById("timer").innerHTML(time--);
    if(time == 1) clearInterval(timer);
	}, 1000).toString();
}

function enter_bugs() {
	var random = bugs[Math.floor((Math.random() * 3))];
	setInterval(function () {context.drawImage(bugs[0],0,0, 20, 20)}, 3000);
}

// Index Page

var is_1 = 0; // if level one is selected is_1=1
var is_2 = 0; // if level two is selected is_2=1

window.onload = pageLoad;

function pageLoad() {
    document.getElementById("level1").onclick = clicked_1;
    document.getElementById("level2").onclick = clicked_2;
}

function clicked_1() {
    is_1 = is_1+1;
    this.style.color = "#fff1a9";
    is_2 = 0;
    unclicked_2();
    display_hs();
}

function unclicked_1() {
    var level = document.getElementById("level1");
    level.style.color = "#373947";
}

function clicked_2() {
    is_2 = is_2+1;
    this.style.color = "#fff1a9";
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

