const gameBoard = (function () {
	//private Method
	let _gameBoardTicks = [];
	let _gameBoardPositionX = [];
	let _gameBoardPositionO = [];

	function storePosition(boxId, xO) {
		if (xO == 'o') {
			_gameBoardPositionO.push(boxId);
		} else {
			_gameBoardPositionX.push(boxId);
		}
	}

	function pushToGameBoardTicks(input) {
		_gameBoardTicks.push(input);
	}

	function infoGameBoardTicks() {
		return _gameBoardTicks;
	}

	function infoGameBoardPositionX() {
		const sortedNum = _gameBoardPositionX.sort();
		return sortedNum;
	}

	function infoGameBoardPositionO() {
		const sortedNum = _gameBoardPositionO.sort();
		return sortedNum;
	}

	//public Method
	return {
		storePosition,
		infoGameBoardTicks,
		pushToGameBoardTicks,
		infoGameBoardPositionO,
		infoGameBoardPositionX,
	};
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
		winCondition(
			gameBoard.infoGameBoardPositionX(),
			gameBoard.infoGameBoardPositionO()
		);
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

	function winCondition(x, o) {
		console.log('O: ' + gameBoard.infoGameBoardPositionO());

		console.log('X: ' + gameBoard.infoGameBoardPositionX());

		const winCondition = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],

			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],

			[1, 5, 9],
			[3, 5, 7],
		];

		for (let i = 0; i < winCondition.length; i++) {
			//NEEDS FIX, dont compare exactly, filter()
			if (winCondition[i].toString() == x.toString()) {
				return console.log('x player wins');
			}
		}
		for (let i = 0; i < winCondition.length; i++) {
			if (winCondition[i].toString() == o.toString()) {
				return console.log('o player wins');
			}
		}
	}

	//public Method
	return { assignPosition };
})();

function players() {}
