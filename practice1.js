const readline = require("readline");

const readln = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentPlayer = "R";

// const board = [
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
// ];

// horizontalTestBoard
// const board = [
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', 'R', ' ', '', ' ', ' ', ' '],
//     [' ', 'Y', 'Y', ' ', ' ', ' ', ' '],
//     ['Y', 'Y', 'Y', 'Y', ' ', ' ', ' '],
//     ['Y', 'R', 'R', 'Y', ' ', ' ', ' ']
// ];

// verticalTestBoard
// const board = [
//   [" ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " "],
//   [" ", "Y", " ", " ", " ", " ", " "],
//   [" ", "Y", " ", " ", " ", " ", " "],
//   ["R", "Y", "Y", "R", " ", " ", " "],
//   ["Y", "Y", "R", "Y", " ", " ", " "],
// ];

// diagTestBoard
const board = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'R', ' ', 'Y', ' ', ' ', ' '],
    [' ', 'Y', 'Y', ' ', ' ', ' ', ' '],
    ['R', 'Y', 'Y', 'R', ' ', ' ', ' '],
    ['Y', 'R', 'R', 'Y', ' ', ' ', ' ']
];

function printBoard() {
  console.log(" 0 1 2 3 4 5 6");
  for (let i = 0; i < 6; i++) {
    console.log(`${i} ${board[i].join(" ")}`);
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "R" ? "Y" : "R";
}

function checkWinner() {
  // check rows win
  // 6 rows: i, 7 columns: j
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2] &&
        board[i][j] === board[i][j + 3]
      ) {
        console.log('rows win');
        return true;
      }
    }
  }

  // check columns win
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i <= 2; i++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i + 1][j] &&
        board[i][j] === board[i + 2][j] &&
        board[i][j] === board[i + 3][j]
      ) {
        console.log('columns win');
        return true;
      }
    }
  }

  // check diagonal positive slope
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2] &&
        board[i][j] === board[i + 3][j + 3]
      ) {
        console.log('diag pos win');
        return true;
      }
    }
  }

  // check diagonal negative slope
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i - 1][j + 1] &&
        board[i][j] === board[i - 2][j + 2] &&
        board[i][j] === board[i - 3][j + 3]
      ) {
        console.log('diag neg win');
        return true;
      }
    }
  }

  return false;
}

function connect4(board) {}

printBoard();
console.log(checkWinner());

function cracklePop() {
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) console.log("CracklePop");
    else if (i % 3 === 0) console.log("Crackle");
    else if (i % 5 === 0) console.log("Pop");
    else console.log(i);
  }
}
