const instruction1 = document.getElementById("instruction1");
const instruction2 = document.getElementById("instruction2");
const instruction3 = document.getElementById("instruction3");
let guessedWord = "";
let attemptsLeft = 10;
let lettersLeft = 0;

document.getElementById("start").onclick = startGame;

function startGame() {
	guessedWord = document.getElementById("word").value;
	lettersLeft = guessedWord.length;
	if (lettersLeft !== 0) {
		guessedWord = guessedWord.toUpperCase();
		removeAllChildNodes(document.getElementById("gameStart"));
		instruction1.textContent = "Try to guess the word!";
		displayAttempts();
		for (let i = 1; i <= guessedWord.length; ++i) {
			const letterBox = document.createElement("input");
			letterBox.type = "text";
			letterBox.class = "letters";
			letterBox.id = i;
			letterBox.readOnly = true;
			document.getElementById("lettersOutputField").appendChild(letterBox);
		}
		for (let i = 0; i < 26; ++i) {
			const letterButton = document.createElement("button");
			letterButton.id = letterButton.textContent = String.fromCharCode(65 + i);
			letterButton.onclick = function () {checkLetter(letterButton.textContent)};
			document.getElementById("letterButtonsField").appendChild(letterButton);
		}
	}
}

function checkLetter(letter) {
	let letterFound = 0;
	for (i = 0; i < guessedWord.length; ++i) {
		if (guessedWord[i] === letter) {
			letterFound = 1;
			const letterBox = document.getElementById(i + 1);
			letterBox.value = letter;
			document.getElementById(letter).style.backgroundColor = "green";
			document.getElementById(letter).disabled = true;
			--lettersLeft;
			if (lettersLeft === 0) {
				gameWin();
			}
		}
	}
	if (letterFound === 0) {
		document.getElementById(letter).style.backgroundColor = "red";
		document.getElementById(letter).disabled = true;
		--attemptsLeft;
		if (attemptsLeft) {
			displayAttempts();
		} else {
			gameOver();
		}

	}
}

function gameWin() {
	instruction1.textContent = "Congratulations! You guessed the word!";
	instruction2.textContent ="The word is: " + guessedWord;
	instruction3.textContent = "Press \"Restart game\" if you want to play one more time";
	removeAllChildNodes(document.getElementById("lettersOutputField"));
	removeAllChildNodes(document.getElementById("letterButtonsField"));
	createRestartButton();
}

function gameOver() {
	instruction1.textContent = "Sorry, you lost...";
	instruction2.textContent ="The word is: " + guessedWord;
	instruction3.textContent = "Press \"Restart game\" if you want to play one more time";
	removeAllChildNodes(document.getElementById("lettersOutputField"));
	removeAllChildNodes(document.getElementById("letterButtonsField"));
	createRestartButton();
}

function createRestartButton() {
	const restartButton = document.createElement("button");
	restartButton.textContent = "Restart game";
	restartButton.id = "restartButton";
	restartButton.onclick = restartGame;
	document.getElementById("gameStart").appendChild(restartButton);
}

function restartGame() {
	instruction1.textContent = "Type in a word and press the \"Start\" button";
	instruction2.textContent = "";
	instruction3.textContent = "";
	document.getElementById("gameStart").removeChild(document.getElementById("gameStart").firstChild);
	const inputWord = document.createElement("input");
	inputWord.id = "word";
	document.getElementById("gameStart").appendChild(inputWord);
	const startButton = document.createElement("button");
	startButton.textContent = "Start";
	startButton.id = "start";
	startButton.onclick = startGame;
	document.getElementById("gameStart").appendChild(startButton);
}

function displayAttempts() {
	instruction3.textContent = "You have " + attemptsLeft + " more attempts left";
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}