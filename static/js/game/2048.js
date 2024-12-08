// When the page loads


let number = prompt('Введите свой номер телефона')

window.onload = function () {
	// var temp = tempGrid(2);
	giveNumber(2);
	newGameBotton();
	getReady();
	backgroundColorToNumber();
	scaleWidth();
	touch();
}


 // Make the ratio of grid width to height 1: 1 on the mobile side
function scaleWidth() {
	 // Get the width of the grid
	var grid = document.getElementsByClassName("grid"),
		width = window.getComputedStyle(grid[0], null)["width"];
		// width = grid[0].style.width;
	 // Assign the height of the grid
	for (var i = 0; i < 16; i++) {
		grid[i].style.height = width;
	}
}

 // Create a temporary grid
function createTempGrid(num) {
		var temp = document.createElement("div");
		temp.innerHTML = "<span>" + num + "</span>";
		temp.style.position = "absolute";
		temp.style.backgroundColor = "#fff8dc";
		temp.style.width = "87.5px";
		temp.style.height = "87.5px";
		temp.style.lineHeight = "87.5px";
		temp.style.fontWeight = "bold";
		temp.style.fontSize = "48px";
		temp.style.borderRadius = "5px";
		temp.style.top = "0";
		temp.style.left = "0";
		// temp.style.display = "none";
		// console.log(temp);
		temp.classList.add("temp-grid");
		return temp;
	};

 // Delete temporary grid
function deleteTempGrid() {
	var temp = document.getElementsByClassName("temp-grid");
	for (var i = 0; i < temp.length; i ++) {
		temp[i].remove();
	}
	var newGrid = document.getElementsByClassName("new-grid");
		// console.log(newGrid);
	if (newGrid) {
		// console.log(newGrid.length);
		for (var i = 0; i < newGrid.length; i ++) {
			newGrid[i].classList.remove("new-grid");
			// console.log(newGrid.length);
		}
	}
}

 // giveNumber: randomly generate a space, put a number num in each space
function giveNumber(num) {
	// console.log("give!!!!");
	var x, y, newGrid, tempGrid;

	tempGrid = createTempGrid(num);

	while (true) {
		// if (tempGrid && tempGrid.parentElement) {
		// 	tempGrid.parentElement.removeChild(tempGrid);
		// }
		x = Math.floor(Math.random() * 4) + 1;
		y = Math.floor(Math.random() * 4) + 1;
		newGrid = document.getElementsByClassName("grid-" + x + y)[0];

		// newGrid.style.backgroundColor = "#b0c4de";
		if (newGrid.innerHTML == "<span></span>") {
			newGrid.classList.add("new-grid");
			newGrid.innerHTML = "<span>" + num + "</span>";
			newGrid.appendChild(tempGrid);
			break;
		}
	}
	// return blankGrid;
}

 // clearGrid: clear space and zero
function clearGrid() {
	var grid = document.getElementsByClassName("grid"),
		score = document.getElementsByClassName("score")[0].children[2];
	score.innerText = "0";
	for (var i = 0; i < grid.length; i ++) {
		grid[i].innerHTML = "<span></span>";
		// grid[i].style.backgroundColor = "#b0c4de";
	}
	backgroundColorToNumber();
}

 // restart the game
function newGame() {
	clearGrid();
	giveNumber(2);
	backgroundColorToNumber();
	return true;
}

 // Button to trigger a new game
function newGameBotton() {
	var newGameBtn = document.getElementsByClassName("new-game")[0];
	newGameBtn.addEventListener("click", function () {
		newGame();
	}, false);
	newGameBtn.addEventListener("touchend", function () {
		newGame();
	}, false);
}

 // backgroundColorToNumber: The number corresponds to the background color / number size
function backgroundColorToNumber() {
	var gridNum,
		// child,
		grid = document.getElementsByClassName("grid");
	for (var i = 0; i < grid.length; i ++) {
		gridNum = getGridNum(grid[i]);
		// child = grid[i].children[0];
		grid[i].style.fontSize = "48px";
		// if ((" " + grid[i].className + " ").indexOf(" " + "new-grid" + " ") == -1) {
			switch (gridNum) {
				case 2:
					grid[i].style.backgroundColor = "#fff8dc";
					 // grid [i] .children [0] .style.color = "#fff"; // This code will paralyze the page! !
					break;
				case 4:
					grid[i].style.backgroundColor = "#e9967a";
					// grid[i].children[0].style.color = "#8f7a66";
					break;
				case 8:
					grid[i].style.backgroundColor = "#FFA07A";
					break;
				case 16:
					grid[i].style.backgroundColor = "#F4A460";
					break;
				case 32:
					grid[i].style.backgroundColor = "#FA8072";
					break;
				case 64:
					grid[i].style.backgroundColor = "#ff7f50";
					break;
				case 128:
					grid[i].style.backgroundColor = "#FF6347";
					grid[i].style.fontSize = "40px";
					break;
				case 256:
					grid[i].style.backgroundColor = "#FF8800";
					grid[i].style.fontSize = "40px";
					break;
				case 512:
					grid[i].style.backgroundColor = "#FF6600";
					grid[i].style.fontSize = "40px";
					break;
				case 1024:
					grid[i].style.backgroundColor = "#F53";
					grid[i].style.fontSize = "32px";
					break;
				case 2048:
					grid[i].style.backgroundColor = "#F40";
					grid[i].style.fontSize = "32px";
					break;
				default:
					grid[i].style.backgroundColor = "#b0c4de";

					// grid[i].children[0].style.color = "#fff";
			}
		// }

	}
}


 // main entrance of the game
function getReady() {
	window.onkeydown = function(e) {
		 deleteTempGrid (); // in other locations
		keyDown(e.keyCode);
		// backgroundColorToNumber();
	}
}

 // getGridNum (ele): Pass in the div element and return the number in the grid
function getGridNum(ele) {
	 return parseInt (ele.children [0] .innerText); // Space returns NaN
}

 // prevGrid in all directions, ie the previous grid in the corresponding direction
function getPrevGrid(ele, direction) {
	var prevEle,
		count = 0;
	 // all directions
	if (direction == "left") {
		return ele.previousElementSibling || null;
	} else if (direction == "right") {
		return ele.nextElementSibling || null;
	} else if (direction == "up") {
		for (var i = 0; i < 4; i ++) {
			ele = ele.previousElementSibling;
			if (!ele) {
				return null;
			}
		}
		return ele;
	} else if (direction == 'down') {
		for (var i = 0; i < 4; i ++) {
			ele = ele.nextElementSibling;
			if (!ele) {
				return null;
			}
		}
		return ele;
	}
}

 // #SLIDE MOTION #
 // The desktop version controls the slider movement direction by monitoring the direction keys
function keyDown(keyCode) {
	var dir,
		arr,
		go,
		 count = 0, // Used to superimpose the score obtained by each exercise
		 signal = 0; // used to judge whether the grid is moving

	switch (keyCode) {
		case 37:
			dir = "left";
			break;
		case 38:
			dir = "up";
			break;
		case 39:
			dir = "right";
			break;
		case 40:
			dir = "down";
			break;
	}

	for (var i = 1; i < 5; i ++) {
		if (dir == "up" || dir == "down") {
			arr = document.getElementsByClassName("col" + i);
		}else if (dir == "left" || dir == "right") {
			arr = document.getElementsByClassName("row" + i);
		}
		if (dir == "up" || dir == "left") {
			for (var j = 1; j <= 3; j ++) {
				// console.log(col[j]);
				max = j;
				 go = howToGo (arr [j], dir, max); // Stack returns the score

				// console.log("go2:" + go);
				signal += go;
				if (go > 1) {
					 count += go; // Accumulate the score of each exercise
				}
			}
		} else if (dir == "down" || dir == "right") {
			for (var j = 2; j >= 0; j --) {
				max = 3 - j;
				go = howToGo(arr[j], dir, max);
				// gridMove(arr[j], dir, 1);
				// console.log("go:" + go);
				signal += go;
				if (go > 1) {
					 count += go; // Accumulate the score of each exercise
				}
			}
		}

	}
	 // The grid has motion signal> 0
	if (signal > 0) {
		// console.log("signal:" + signal);
		giveNumber(2);
		backgroundColorToNumber();
		testGameOver();
	}
	 // The grid moves and the score is> 0
	if (count > 0) {
		addScore(count);
	}
	return count;
}

 // The mobile terminal uses the touch event to monitor the slider movement
function touch() {
	var gameBoard = document.getElementsByClassName("game-board")[0];
	gameBoard.addEventListener("touchstart",function (e) {

		// e.preventDefault();
		startX = e.changedTouches[0].pageX;
	    startY = e.changedTouches[0].pageY;
	},false);

	gameBoard.addEventListener('touchend',function(e){

		 e.preventDefault (); // Prevent the browser's default behavior, such as scrolling, jumping, etc. !!
		 // Get the X, Y when sliding the screen
		endX = e.changedTouches[0].pageX,
		endY = e.changedTouches[0].pageY;
		 // Get the sliding distance
		distanceX = endX-startX;
		distanceY = endY-startY;
		 // determine the sliding direction, the sliding angle is greater than 15 °
		if(Math.abs(distanceX) / Math.abs(distanceY) > 1.73 && distanceX > 0){
		    deleteTempGrid();
		    keyDown(39);
		}else if(Math.abs(distanceX) / Math.abs(distanceY) > 1.73 && distanceX < 0){
		    deleteTempGrid();
		    keyDown(37);
		}else if(Math.abs(distanceY) / Math.abs(distanceX) > 1.73 && distanceY < 0){
		    deleteTempGrid();
		    keyDown(38);
		}else if(Math.abs(distanceY) / Math.abs(distanceX) > 1.73 && distanceY > 0){
		    deleteTempGrid();
		    keyDown(40);
		}else{
		     // console.log ('click and not slide');
		}
	});
}

 // 3. Record the score, the score will increase,
function addScore(score) {
	var span = document.getElementsByClassName("number"),
		currentScore = parseInt(span[0].innerText),
		bestScore = parseInt(span[1].innerText);
	span[0].innerText = score + currentScore;

	// SCORE
	let new_score = score + currentScore

	let xhr = new XMLHttpRequest();
    xhr.open("POST", '/update_game_scores', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = "json"
    xhr.send(`number=${number}&score=${new_score}`);

	scoreUpAnimaton("score", score);
	if (span[0].innerText > bestScore) {
		scoreUpAnimaton("best", score);
		span[1].innerText = span[0].innerText;
	}
}

 // howToGoLeft (ele, direction, max): This function determines how a single grid moves
function howToGo(ele, direction, max, testMode) {
	var prevGrid,
		prevGridNum,
		gridNum = 0,
		go,
		addNum,
		numLen,
		doubleNumGrid;
		// console.log(prevGrid);

	 // all directions
	prevGrid = getPrevGrid(ele, direction);
	gridNum = getGridNum(ele);
	if (prevGrid) {
		prevGridNum = getGridNum(prevGrid);
	} else {
		prevGridNum = "null";
	}
	 // There is a space in front of it, continue to judge. . . . . . . . . . . . . . . . . . . . .
	if (gridNum && !prevGridNum) {
		prevGrid.innerHTML = ele.innerHTML;
		ele.children[0].innerText = "";
		max -= 1;
		// gridMove(ele, direction, 1);
		if (max) {
			go = howToGo(prevGrid, direction, max);
			// 0、double、continue
		}
		 // returns 1
		// console.log("go:" + (go || 1));
		// if (max == 0) {
		// 	console.log("before:" + typeof(go));
		// 	go = 1;
		// 	console.log("after" + typeof(go));
		// }

		return go || 1;
		 // If go = 0, return 1; go = double, return double, go = underfied, return 1

	 // Same as the previous number
	} else if (gridNum == prevGridNum) {
		if (!testMode) {
			gridNum *= 2;
			// addScore(gridNum);
			// gridMove(ele, direction, 1);
			prevGrid.children[0].innerText = gridNum + "";

			 // Add an animation where the number gets bigger:
			// numLen = (gridNum + "").length;

			ele.children[0].innerText = "";
			// console.log('gridNum：' + gridNum)
			if (gridNum == 2048) {
				popup("win");
			}
			 // If the numbers are superimposed, the score is returned, and the score is ≥4
		}
		// console.log("gridNum:  " + gridNum);
		return gridNum;
	} else {
		 // The grid does not move, returns 0
		return 0;
	}
}


 // 4. How to judge game over, or reach 2048 as winner
// test geme over
function testGameOver() {
	var content,
		leftTest,
		rightTest,
		upTest,
		downTest,
		count = 0;
		grid = document.getElementsByClassName("grid");
	for (var i = 0; i < grid.length; i ++) {
		content = grid[i].innerHTML;
		if (content != "<span></span>") {
			count += 1;
		}
	}
	// console.log("count：" + count);
	if (count == 16) {
		if (getGridNum(grid[3]) == getGridNum(grid[4])) {
			count -= 2;
		}
		if (getGridNum(grid[7]) == getGridNum(grid[8])) {
			count -= 2;
		}
		if (getGridNum(grid[11]) == getGridNum(grid[12])) {
			count -= 2;
		}
		for (var i = 0; i < grid.length; i ++) {
			if(!howToGo(grid[i], "left", 1, true) && !howToGo(grid[i], "right", 1, true) && !howToGo(grid[i], "up", 1, true) && !howToGo(grid[i], "down", 1, true)) {
				count --;
				if (count == 0) {
					popup("game-over");
					return true;
				}
			}
		}
	}
	return false;
}

 // Pop up after game over
function popup(popType) {
	var num,
		tryAgainEle,
		ele = document.getElementsByClassName(popType)[0],
		headerEle = document.getElementsByClassName("header")[0],
		gameBoardEle = document.getElementsByClassName("game-board")[0];
	ele.style.display = "block";
	headerEle.style.opacity = "0.4";
	gameBoardEle.style.opacity = "0.4";

	// tryAgain(num);
	if (popType == "game-over") {
		num = 0;
	}
	if (popType == "win") {
		num = 1;
	}
	tryAgainEle = document.getElementsByClassName("try-again")[num];
	tryAgainEle.addEventListener("click", function () {
		tryAgain(ele, headerEle, gameBoardEle);
	}, false);
	tryAgainEle.addEventListener("touchend", function () {
		tryAgain(ele, headerEle, gameBoardEle);
	}, false);
}

 // Again
function tryAgain(ele, headerEle, gameBoardEle) {
	ele.style.display = "none";
	headerEle.style.opacity = "1.0";
	gameBoardEle.style.opacity = "1.0";
	newGame();
}

 // 5. Test
function test() {
	var randomInt,
		timer;
	timer = setInterval(function() {
		randomInt = Math.floor(Math.random() * 4) + 37;
		keyDown(randomInt);
		// console.log(randomInt);
		if (testGameOver()) {
			clearInterval(timer);
		}
	}, 300);
}


 // Animation of increasing score
function scoreUpAnimaton(type, score) {

	var ele,
		score,
		timer,
		count = 0;
	if (type == "score") {
		ele = document.getElementsByClassName("score-animation")[0];
	} else if (type == "best") {
		ele = document.getElementsByClassName("best-animation")[0];
	}
	score = "+" + score;
	ele.innerText = score;
	ele.style.top = "25px";
	ele.style.color = "#8f7a66";
	ele.style.opacity = "1.0"

	timer = setInterval(function() {
		count ++;
		ele.style.display = "inline-block";
		ele.style.top = parseInt(ele.style.top) - 8 + "px";
		ele.style.opacity = parseFloat(ele.style.opacity) - 0.1;
		if (count == 6) {
			clearInterval(timer);
			ele.style.display = "none";
		}
	}, 80);
}

