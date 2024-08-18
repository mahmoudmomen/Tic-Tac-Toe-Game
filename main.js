// call HTML elements
const playerSwitchHeader = document.querySelector('.head #playerSwitch');
const allBoxesArr = [...document.querySelectorAll('.containerOfBoxes > .box')];
const resetBtn = document.querySelector('.controls > .resetBtn');
resetBtn.addEventListener('click', () => window.location.reload()); // reset game
const winnerMsgSpan = document.querySelector('#winnerMsg > span');

// switch part
let arrOFSwitchVars = ['X', 'O']; // for random start
let randomIdx = parseInt(Math.random() * arrOFSwitchVars.length);
let switchVar = arrOFSwitchVars[randomIdx];
playerSwitchHeader.innerHTML = switchVar;

// set style depending on switchVar
switchVar == 'X'
	? playerSwitchHeader.classList.add('playerX')
	: playerSwitchHeader.classList.add('playerO');

// changer switch
switcher_func = () => {
	switchVar === 'X' ? (switchVar = 'O') : (switchVar = 'X');
};

// change the switcher in UI
function switchVarInUi() {
	switch (switchVar) {
		case 'X':
			playerSwitchHeader.innerHTML = 'O';
			playerSwitchHeader.classList.remove('playerX');
			playerSwitchHeader.classList.add('playerO');
			break;
		case 'O':
			playerSwitchHeader.innerHTML = 'X';
			playerSwitchHeader.classList.remove('playerO');
			playerSwitchHeader.classList.add('playerX');
			break;
	}
}

// add switch to UI & add css classes
function setBoxSetting(e) {
	// display switchVar on the clicked box
	e.target.innerHTML = switchVar;
	e.target.classList.add('done');

	// set player color
	switchVar == 'X' ? e.target.classList.add('playerX') : e.target.classList.add('playerO');
}

/*
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
const winsPossiableStates = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function checkIfThereAreWiners(e) {
	for (arr of winsPossiableStates) {
		if (arr.includes(+e.target.getAttribute('data-idx'))) {
			let arrOfBoxesOfidxs = [
				allBoxesArr[arr[0]].innerHTML,
				allBoxesArr[arr[1]].innerHTML,
				allBoxesArr[arr[2]].innerHTML,
			];

			// if size is [1] . so, all values are equals => winner
			if (new Set(arrOfBoxesOfidxs).size == 1) {
				winnerMsgSpan.innerHTML = switchVar;

				// add css colr style depending on the winner switchVar
				switchVar == 'X'
					? winnerMsgSpan.classList.add('playerX')
					: winnerMsgSpan.classList.add('playerO');

				// disable all boxes from click
				for (box of allBoxesArr) {
					// for best performance
					!box.classList.contains('done') && box.classList.add('done');
				}

				// return true to prevent anything else from work [Game Over]
				return true;
			}
		}
	}

	// Game not Over
	return false;
}

// check if Game Blocked or not
function isGameBlock() {
	for (box of allBoxesArr) {
		if (!box.classList.contains('done')) {
			return false;
		}
	}
	return true;
}

allBoxesArr.forEach((e) => {
	e.addEventListener('click', (event) => {
		switchVarInUi();
		setBoxSetting(event);

		// shortcut for if condition
		!checkIfThereAreWiners(event) && isGameBlock()
			? (winnerMsgSpan.parentElement.innerHTML = 'Draw "Game Over"')
			: switcher_func();
	});
});
