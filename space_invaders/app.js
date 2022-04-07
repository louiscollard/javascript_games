const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".result");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;

for (let i = 0; i < 255; i++) {
	const square = document.createElement("div");
	grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const aliensInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

function draw() {
	for (let i = 0; i < aliensInvaders.length; i++) {
		squares[aliensInvaders[i]].classList.add("invader");
	}
}

draw();

function remove() {
	for (let i = 0; i < aliensInvaders.length; i++) {
		squares[aliensInvaders[i]].classList.remove("invader");
	}
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter() {
	squares[currentShooterIndex].classList.remove("shooter");
	switch (e.key) {
		case "Arrow Left":
			if (currentShooterIndex % width !== 0) {
				currentShooterIndex -= 1;
			}
			break;
		case "Arrow Right":
			if (currentShooterIndex % width < width - 1) {
				currentShooterIndex += 1;
			}
			break;
	}
	squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

function moveInvaders() {
	const leftEdge = aliensInvaders[0] % width === 0;
	const rightEdge = aliensInvaders[aliensInvaders.length - 1] % width === width - 1;
	remove();

	if (rightEdge && goingRight) {
		for (let i = 0; i < aliensInvaders.length; i++) {
			aliensInvaders[i] += width + 1;
			direction = -1;
			goingRight = false;
		}
	}

	if (leftEdge && !goingRight) {
		for (let i = 0; i < aliensInvaders.length; i++) {
			aliensInvaders[i] += width - 1;
			direction = 1;
			goingRight = true;
		}
	}

	for (let i = 0; i < aliensInvaders.length; i++) {
		aliensInvaders[i] += direction;
	}

	draw();

	if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
		resultDisplay.innerHTML = "GAME OVER";
		clearInterval(invadersId);
	}

	for (let i = 0; i < aliensInvaders.length; i++) {
		if (aliensInvaders[i] > squares.length) {
			resultDisplay.innerHTML = "GAME OVER";
		}
	}
}

invadersId = setInterval(moveInvaders, 100);
