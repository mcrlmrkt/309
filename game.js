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
		context.drawImage(foods[i], 20 ,20, 20, 20); 
	}
	//Create an array of bugs which can enter the screen at random order
	var ladybug = new Image();
	var ant = new Image();
	var bee = new Image();
	var bugs = [ladybug, ant, bee];
	var bug = ['ladybug', 'ant', 'bee'];

	for (var i=0; i < 4; i++){
		var canvas = document.getElementById(bug[i]);
		var context = canvas.getContext("2d"); 
		bugs[i].src= bug[i] + ".png";
		context.drawImage(bugs[i],20,0, 20, 20); 
	}
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

