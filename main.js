const gameBoard = (function () {
	//private Method
	let _gameBoardTicks = [];
	let _gameBoardPosition = [];

	let _gameBoardPositionX = [];
	let _gameBoardPositionO = [];

	function storePosition(boxId, xO) {
		if (xO == 'o') {
			_gameBoardPositionO.push(boxId);
			console.log('o');
		} else {
			_gameBoardPositionX.push(boxId);
			console.log('x');
		}
	}

	function infoGameBoardTicks() {
		return _gameBoardTicks;
	}

	function pushToGameBoardTicks(input) {
		_gameBoardTicks.push(input);
	}

	//public Method
	return { storePosition, infoGameBoardTicks, pushToGameBoardTicks };
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
		const xO = xOLogic();
		gameBoard.storePosition(boxId, xO);

		gameBoard.pushToGameBoardTicks(xO);
		displayTick(xO, boxId);
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
	function displayTick(xO, boxId) {
		const box = document.getElementById(boxId);
		box.textContent = xO;
	}

	function winCondition() {}

	//public Method
	return { assignPosition };
})();

function players() {}
