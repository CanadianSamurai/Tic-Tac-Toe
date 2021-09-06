const gameBoard = (function () {
	//private Method
	let _gameBoardTicks = [];
	let _gameBoardPosition = [];

	function logPosition(boxId) {
		_gameBoardPosition.push(boxId);
	}

	function infoGameBoardTicks() {
		return _gameBoardTicks;
	}

	function pushToGameBoardTicks(input) {
		_gameBoardTicks.push(input);
		console.log(_gameBoardTicks);
	}

	//public Method
	return { logPosition, infoGameBoardTicks, pushToGameBoardTicks };
})();

const displayController = (function () {
	//private Method
	const boxes = document.getElementsByClassName('board-box');
	const listenToBoxes = Array.from(boxes).forEach(box => {
		box.addEventListener('click', assignPosition);
	});
	function assignPosition(e) {
		let boxId = e.target.id;
		//prevents tick on already ticked box
		if (e.target.textContent) {
			return;
		}
		gameBoard.logPosition(boxId);
		const xOrO = xOLogic();
		gameBoard.pushToGameBoardTicks(xOrO);
		displayTick(xOrO, boxId);
	}
	function xOLogic() {
		if (
			//see if the last tick is "x" or "o"
			gameBoard.infoGameBoardTicks()[
				gameBoard.infoGameBoardTicks().length - 1
			] == 'x'
		) {
			return 'o';
		} else {
			return 'x';
		}
	}
	function displayTick(xOrO, boxId) {
		const box = document.getElementById(boxId);
		box.textContent = xOrO;
	}
	//public Method
	return { assignPosition };
})();

function players() {}
