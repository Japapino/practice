const readline = require("readline");

const readln = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentPlayer = "R";

const board = [
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
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
    for (let j = 0; j <= 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2] &&
        board[i][j] === board[i][j + 3]
      ) {
        console.log("horizontal win");
        console.log(board[i][j], " wins!");
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
        console.log("vertical win");
        console.log(board[i][j], " wins!");
        return true;
      }
    }
  }

  // check diagonal neg slope
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2] &&
        board[i][j] === board[i + 3][j + 3]
      ) {
        console.log("diag neg win");
        console.log(board[i][j], " wins!");
        return true;
      }
    }
  }

  // check diagonal pos slope
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j <= 3; j++) {
      if (
        board[i][j] !== " " &&
        board[i][j] === board[i - 1][j + 1] &&
        board[i][j] === board[i - 2][j + 2] &&
        board[i][j] === board[i - 3][j + 3]
      ) {
        console.log("diag pos win");
        console.log(board[i][j], " wins!");
        return true;
      }
    }
  }

  return false;
}

function playTurn() {
  readln.question(
    `Player ${currentPlayer}, enter your move (column): `,
    (answer) => {
      const col = parseInt(answer, 10);

      // validate column selection
      if (isNaN(col) || col < 0 || col > 7) {
        console.log("Invalid move. Outside of game board. Try again.");
        playTurn();
        return;
      } else if (board[0][col] !== " ") {
        console.log("Invalid move. Column full. Try again.");
        playTurn();
        return;
      }

      // place piece, move bottom up
      for (let row = 5; row >= 0; row--) {
        if (board[row][col] === " ") {
          board[row][col] = currentPlayer;
          break;
        }
      }

      printBoard();

      if (checkWinner()) {
        readln.close();
        return;
      }

      if (isBoardFull()) {
        readln.close();
        return;
      }

      switchPlayer();
      playTurn();
    }
  );
}

function isBoardFull() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (board[i][j] == " ") {
        return false;
      }
    }
  }
  console.log("It's a tie!");
  return true;
}

function threeSum(nums) {
  let result = [];

  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length && i != i-1; i++) {
    if (nums[i]> 0) break;
    if (i > 0 && nums[i] == nums[i-1]) continue;
      let start = i+1; 
      let end = nums.length-1;
      while (start < end) {
        let sum = nums[i] + nums[start] + nums[end];
        if (sum == 0) {
          result.push([nums[i], nums[start], nums[end]]);

          start++;
          end--;

          while(start<end && nums[start]===nums[start-1]) start++;
          while(start<end && nums[end]===nums[end+1]) end--;

        } else if (sum < 0) {
          start++;
        } else if (sum > 0 ) {
          end--; 
        }
      }
    }

  return result;
}

// let nums=[-1,0,1,2,-1,-4];
let nums=[1,-1,-1,0];
console.log(threeSum(nums));


// printBoard();
// playTurn();

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

// diagTestBoardPos
// const board = [
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', 'R', ' ', 'Y', ' ', ' ', ' '],
//     [' ', 'Y', 'Y', ' ', ' ', ' ', ' '],
//     ['R', 'Y', 'Y', 'R', ' ', ' ', ' '],
//     ['Y', 'R', 'R', 'Y', ' ', ' ', ' ']
// ];

// diagTestBoardNeg
// const board = [
//   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   ['Y', 'R', ' ', ' ', ' ', ' ', ' '],
//   ['R', 'Y', 'Y', ' ', ' ', ' ', ' '],
//   ['R', 'Y', 'Y', 'R', ' ', ' ', ' '],
//   [' ', 'R', 'R', 'Y', ' ', ' ', ' ']
// ];

// fullTestBoard
// const board = [
//   ['R', 'R', 'R', 'Y', 'R', 'Y', 'R'],
//   ['Y', 'R', 'R', 'Y', 'R', 'Y', 'R'],
//   ['Y', 'R', 'Y', 'R', 'R', 'Y', 'R'],
//   ['R', 'Y', 'R', 'Y', 'Y', 'R', 'Y'],
//   ['R', 'Y', 'Y', 'R', 'Y', 'R', 'R'],
//   ['R', 'R', 'R', 'Y', 'Y', 'R', 'R']
// ];

// function cracklePop() {
//   for (let i = 1; i <= 100; i++) {
//     if (i % 3 === 0 && i % 5 === 0) console.log("CracklePop");
//     else if (i % 3 === 0) console.log("Crackle");
//     else if (i % 5 === 0) console.log("Pop");
//     else console.log(i);
//   }
// }
