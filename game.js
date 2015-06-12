var food_images = [cupcake_img, banana_img, apple_img, burger_img];

var bugs_images = [ladybug_img, ant_img, bee_img];

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
