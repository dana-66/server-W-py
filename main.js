function goToHomePage() {
  window.location.reload();
}
// for the TIC - TAC - TOE game
// Array to store the state of the game board
var board = ['', '', '', '', '', '', '', '', ''];

// Array to store the winning combinations
var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Variable to keep track of the current player (X or 0)
var currentPlayer = 'X';

// Function to handle a move on the game board
function handleMove(position) {
    if (board[position] === '') {
        board[position] = currentPlayer;
        document.getElementById('b' + (position + 1)).value = currentPlayer;
        document.getElementById('b' + (position + 1)).disabled = true;

        if (checkWin(currentPlayer)) {
            document.getElementById('print').innerHTML = 'Player ' + currentPlayer + ' won';
            window.alert('Player ' + currentPlayer + ' won');
            disableBoard();
        } else if (checkTie()) {
            document.getElementById('print').innerHTML = 'Match Tie';
            window.alert('Match Tie');
            disableBoard();
        } else {
            currentPlayer = (currentPlayer === 'X') ? '0' : 'X';
            if (currentPlayer === '0') {
              makeComputerMove();
          }
            document.getElementById('print').innerHTML = 'Player ' + currentPlayer + ' Turn';
        }
    }
}

// Function to check if a player has won
function checkWin(player) {
    for (var i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// Function to check if the game is tied
function checkTie() {
    return board.every(function (cell) {
        return cell !== '';
    });
}

// Function to disable the game board
function disableBoard() {
    for (var i = 1; i <= 9; i++) {
        document.getElementById('b' + i).disabled = true;
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.getElementById('print').innerHTML = 'Player X Turn';
    for (var i = 1; i <= 9; i++) {
        document.getElementById('b' + i).value = '';
        document.getElementById('b' + i).disabled = false;
    }
}
function makeComputerMove() {
  // Find an empty position on the board for the computer's move
  var emptyPositions = [];
  for (var i = 0; i < board.length; i++) {
      if (board[i] === '') {
          emptyPositions.push(i);
      }
  }

  // Choose a random position from the empty positions
  var randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];

  // Make the computer's move
  handleMove(randomPosition);
}
function showXOGame() {
  document.getElementById('conversation2').style.display = 'none';
  document.getElementById('conversation1').style.display = 'none';
    // document.getElementById('playBtn').style.display = 'none';
    document.getElementById('game1Container').style.display = 'block';
}


// end of TIC - TAC - TOE game
// Card matching game
const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
function showMatchingCardsGame() {
  document.getElementById('conversation1').style.display = 'none';
  document.getElementById('conversation2').style.display = 'none';
  document.getElementById('playBtn2').style.display = 'none';
  document.getElementById('game2Container').style.display = 'block';
}
// end Card matching game
