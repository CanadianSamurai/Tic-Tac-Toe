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
		console.log('O: ' + o);

		console.log('X: ' + x);

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
			let first, second, third;
			for (let f = 0; f < winCondition[i].length; f++) {
				if (f == 0) {
					first = winCondition[i][f].toString();
				} else if (f == 1) {
					second = winCondition[i][f].toString();
				} else if (f == 2) {
					third = winCondition[i][f].toString();
				}
			}
			console.log(first, second, third);
			if (x.includes(first) && x.includes(second) && x.includes(third)) {
				return console.log('x player wins');
			} else if (o.includes(first) && o.includes(second) && o.includes(third)) {
				return console.log('o player wins');
			}
		}
	}

	//public Method
	return { assignPosition };
})();

function players() {}
