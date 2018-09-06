window.onload = () => {
	let canvas = document.getElementById("field");
	let img = document.getElementById("image");

	let c = canvas.getContext('2d');

	let height = canvas.height = window.innerHeight
	let width = canvas.width = window.innerWidth;

	let arrOfCircles = [];

	let count = 10;
	let mouserClicked = true;


	document.addEventListener("click", onClick, true);

	function onClick(e){
		for(let i = 0; i < count; i++){
		let star = new Star(e.clientX, e.clientY, (Math.random() * 2) - 1, (Math.random() * 2) - 1 ,1, i%2);
		arrOfCircles.unshift(star);
	}
	}


	function Star(x, y, dx, dy, radius,check){
		this.startX = x;
		this.startY = y;
		this.x = x;
		this.y = y;
		this.dx = Math.random() * innerWidth * 0.1 * Math.floor(dx);
		this.dy = Math.random() * innerHeight * 0.1 * Math.floor(dy);
		this.radius = radius;
		this.check = check;

		this.draw = () => {
			c.beginPath();
				if(this.check === 1){
					c.drawImage(img, this.x, this.y, this.radius, this.radius)
				} else{
					c.arc(this.x, this.y, this.radius/7, 0, 2 * Math.PI, false);
				}
			c.fillStyle = "white";
			c.fill();
		}

		this.update = (cX, cY) => {
				this.x += dx+cX;
				this.y += dy+cY;
				let size = Math.pow(this.x, 2) + Math.pow(this.y, 2);
				this.radius += Math.sqrt(size) / 5000;
				this.draw();
		}

		this.getRadius = () => {
			return this.radius;
		}

		this.getX = () => {
			return this.x;
		}

		this.getY = () => {
			return this.y;
		}
	}

		function animate(){
			requestAnimationFrame(animate);
			c.clearRect(0,0, width, height);

			if(arrOfCircles.length !== 0){
				for(let i = 0; i < arrOfCircles.length; i++){

					arrOfCircles[i].update();

					if(arrOfCircles[i].getX() - arrOfCircles[i].getRadius() > width || arrOfCircles[i].getY() - arrOfCircles[i].getRadius() > height || arrOfCircles[i].getX() + arrOfCircles[i].getRadius() < 0 || arrOfCircles[i].getY() + arrOfCircles[i].getRadius() < 0){
						arrOfCircles.splice(i, 1);
					}
				}
			}
		}
		animate();
}
