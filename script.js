let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Audio Elements
const bgMusic = document.getElementById("bgMusic");
const xSound = document.getElementById("xSound");
const oSound = document.getElementById("oSound");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

// Set background music to play on loop (toggle controlled below)
bgMusic.loop = true;

// Settings: Toggle event listeners
document.getElementById("bgMusicToggle").addEventListener("change", function () {
  this.checked ? bgMusic.play() : bgMusic.pause();
});
document.getElementById("xSoundToggle").addEventListener("change", function () {
  xSound.muted = !this.checked;
});
document.getElementById("oSoundToggle").addEventListener("change", function () {
  oSound.muted = !this.checked;
});
document.getElementById("clickSoundToggle").addEventListener("change", function () {
  clickSound.muted = !this.checked;
});
document.getElementById("winSoundToggle").addEventListener("change", function () {
  winSound.muted = !this.checked;
});

function showPage(page) {
  // Hide all pages
  document.querySelectorAll("div[id$='Page']").forEach(div => div.classList.add("hidden"));
  // Show target page
  document.getElementById(page).classList.remove("hidden");

  // If coming to game page, restart game
  if (page === "gamePage") {
    restartGame();
  }
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.getElementsByClassName("cell")[index].innerText = currentPlayer;

  // Play X or O sound based on current player
  if (currentPlayer === "X") {
    if (document.getElementById("xSoundToggle").checked) xSound.play();
  } else {
    if (document.getElementById("oSoundToggle").checked) oSound.play();
  }

  if (checkWinner()) return;

  // Change turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("currentTurn").innerText = currentPlayer;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      // Add winning style to cells


      pattern.forEach(i => document.getElementsByClassName("cell")[i].classList.add("win"));
      showWinner(`${currentPlayer} Wins! 🎉`);
      return true;
    }
  }

  // Check for Draw
  if (!board.includes("")) {
    showWinner("It's a Draw! 🤝");
    return true;
  }

  return false;
}

function showWinner(message) {
  gameActive = false;

  // Play win sound immediately
  if (document.getElementById("winSoundToggle").checked) {
    winSound.play();
  }

  // Delay before showing the winner page
  setTimeout(() => {
    document.getElementById("winnerText").innerText = message;
    showPage("winnerPage");
  }, 2000); // Wait for 2 seconds (2000ms)
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  document.getElementById("currentTurn").innerText = "X";
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("win");
  });
}