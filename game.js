<!--Create an array of food to be placed randomly in the screen-->
			var banana = new Image();
			var cupcake = new Image();
			var apple = new Image();
			var burger = new Image();
			var food_img = [banana, cupcake, apple, burger]; //array of food
			var food = ['banana', 'cupcake', 'apple', 'burger'];

			for (var i=0; i < 4; i++){
				var canvas = document.getElementById(food[i]);
				var context = canvas.getContext("2d"); 
				food_img[i].src= food[i] + ".png";
				context.drawImage(food_img[i], 20 ,20, 20, 20); 
			}
			<!--Create an array of bugs which can enter the screen at random order-->
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