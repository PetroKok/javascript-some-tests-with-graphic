let canvas = document.getElementById("field");
let c = canvas.getContext('2d');
let height = canvas.height = window.innerHeight
let width = canvas.width = window.innerWidth;
let arrOfCircles = [];
let count = 10;
let mouserClicked = false;

console.log(window)

canvas.addEventListener("click", onClick, false);
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("resize", onResize);

function onResize(){
	height = canvas.height = window.innerHeight
	width = canvas.width = window.innerWidth;
	console.log(height + " and " + width);
}

function onMouseDown(){
	mouserClicked = true;
}

function onMouseUp(){
	mouserClicked = false;
}

function onMouseMove(e){
	if(mouserClicked){
		handleDraw(e);
		}
}

function onClick(e){
	handleDraw(e);
}

function retX(x){
	if(x > width/2){
		return -1;
	} 
	return 1;
}

function retY(y){
	if(y> height/2){
		return -1;
	} 
	return 1;
}

function handleDraw(e = false){
	for (var i = 0; i < count; i++) {
		let rad = Math.random() * innerHeight * 0.02;
		let x = e.clientX || Math.random() * (innerWidth - rad * 2) + rad;
		let y = e.clientY || Math.random() * (innerHeight - rad * 2) + rad;
		let dx = Math.random() * innerWidth * 0.005 * retX(x);
		let dy = Math.random() * innerHeight * 0.005 * retY(y);
		arrOfCircles.push(new Circle(x, y, dx, dy, rad, getRandomColor()));
	}
	
}

function Circle(x, y, dx, dy, rad, color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.rad = rad;
	this.color = color;
}

Circle.prototype.draw = function(color){
		c.beginPath();
		c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
		c.fillStyle = this.color;
		c.fill();
	}

Circle.prototype.update = function(){

		if(this.x + this.rad > innerWidth || this.x - this.rad < 0){
			this.dx = -this.dx;
			this.color = getRandomColor();
		}

		if(this.y + this.rad > innerHeight || this.y - this.rad < 0){
			this.dy = -this.dy;
			this.color = getRandomColor();
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw(this.color);
	}

handleDraw();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0, width, height);

	for(let i = 0; i < arrOfCircles.length; i++){
		arrOfCircles[i].update();
		if(i >=1000){
			arrOfCircles = []
		}
	}

}

function getRandomColor(){
	let letters = "0123456789ABCDEF";
	let color = "#";
	for(let i = 0; i < 6; i++){
		color += letters[Math.floor(Math.random()*16)];
	}
	return color;
}

animate();


