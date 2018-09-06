let canvas = document.getElementById("field");
let c = canvas.getContext('2d');

let height = canvas.height = window.innerHeight
let width = canvas.width = window.innerWidth;

let mouserClicked = false, mouseReleased = true;

document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);
document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("click", onClick, false);

function onClick(e){
	draw(e);
}

function onMouseDown(e){
	mouserClicked = true;
	draw(e);
}

function onMouseUp(e){
	draw(e);
	mouserClicked = false;
}



function getRandomColor(){
	let letters = "0123456789ABCDEF";
	let color = "#";
	for(let i = 0; i < 6; i++){
		color += letters[Math.floor(Math.random()*16)];
	}
	return color;
}

function onMouseMove(e){
	console.log(height)
	if(mouserClicked){
		draw(e);
		}
}

function draw(e){
		c.fillStyle = getRandomColor();
		c.fill();
		c.beginPath()
		c.arc(e.clientX, e.clientY, 15, 0, 2 * Math.PI, false);
}