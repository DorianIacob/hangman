const startButton = document.getElementById("start");
let guessedWord = "";
let attemptsLeft = 10;
let lettersLeft = 0;

startButton.onclick = startGame;

function displayAttempts(element, value) {
	element.textContent = "You have " + value + " more attempts left";
}

function startGame() {
	const enteredWord = document.getElementById("word");
	guessedWord = enteredWord.value;
	lettersLeft = guessedWord.length;
	if (lettersLeft !== 0) {
		guessedWord = guessedWord.toUpperCase();
		const gameStart = document.getElementById("gameStart");
		gameStart.removeChild(enteredWord);
		gameStart.removeChild(startButton);
		const instructions = document.getElementById("instructions");
		instructions.textContent = "Try to guess the word!"
		const infoAttempts = document.createElement("p");
		displayAttempts(infoAttempts, attemptsLeft);
		const informUser = document.getElementById("informUser");
		informUser.appendChild(infoAttempts);
		for (let i = 1; i <= guessedWord.length; ++i) {
			const letterBox = document.createElement("input");
			letterBox.type = "text";
			letterBox.class = "letters";
			letterBox.id = i;
			letterBox.readOnly = true;
			const lettersOutputField = document.getElementById("lettersOutputField");
			lettersOutputField.appendChild(letterBox);
		}
		for (let i = 0; i < 26; ++i) {
			const letterButton = document.createElement("button");
			letterButton.id = letterButton.textContent = String.fromCharCode(65 + i);
			letterButton.onclick = function () {checkLetter(letterButton.textContent)};
			const letterButtonsField = document.getElementById("letterButtonsField");
			letterButtonsField.appendChild(letterButton);
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
			document.getElementById(letter).style.color = "green";
			--lettersLeft;
			if (lettersLeft === 0) {
				winGame();
			}
		}
	}
	if (letterFound === 0) {
		document.getElementById(letter).style.color = "red";
		--attemptsLeft;
	}
}