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
  for (let i = 0; i < nums.length && i != i - 1; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let start = i + 1;
    let end = nums.length - 1;
    while (start < end) {
      let sum = nums[i] + nums[start] + nums[end];
      if (sum == 0) {
        result.push([nums[i], nums[start], nums[end]]);

        start++;
        end--;

        while (start < end && nums[start] === nums[start - 1]) start++;
        while (start < end && nums[end] === nums[end + 1]) end--;
      } else if (sum < 0) {
        start++;
      } else if (sum > 0) {
        end--;
      }
    }
  }

  return result;
}

/*
You are given an integer array prices where prices[i] is the price of NeetCoin on the ith day.

You may choose a single day to buy one NeetCoin and choose a different day in the future to sell it.

Return the maximum profit you can achieve. You may choose to not make any transactions, in which case the profit would be 0.

Example 1: 
Input: prices = [10,1,5,6,7,1]

Output: 6

*/

// sliding window, buy/sell stock
const prices = [2, 4, 1];
/*
Problem with this array is the lowest value is at the end, so now we have to check the next lowest value
We can remove the value from the array and do the same procedure 
*/
function maxProfit(prices) {
  let maximumProfit = 0;
  // for each item, create sub-array and search for largest value.
  // compare to current profit and keep largest
  for (let i = 0; i < prices.length; i++) {
    const subArray = prices.slice(i + 1);

    const subMax = Math.max(...subArray);

    const profit = subMax - prices[i];

    maximumProfit = profit > maximumProfit ? profit : maximumProfit;
  }

  return maximumProfit;
}

// Sliding Window, Longest Substring w/o Duplicates
// Given a string s, find the length of the longest substring without duplicate characters.

// const string="dvdf";
// the problem with this one is we needed to start the new stack after the first 'd', not the second
// use same approach as maxProfit using subarrays and iterate that

// const string = "pwwkew";
const string =
  "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3";

function lengthOfLongestSubstring(s) {
  // use 2-pointers, left and right
  let stack = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    console.log("right: ", right);
    while (stack.has(s[right])) {
      stack.delete(s[left]);
      left++;
    }

    stack.add(s[right]);

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// first loop using stacks
function lengthOfLongestSubstring_1(string) {
  // create an empty stack
  const array = Array.from(s);
  let stack = [];
  let maxLength = 1;

  if (s.length == 0) {
    return 0;
  } else if (s.length == 1) {
    return 1;
  }

  // start iterating through the string
  array.forEach((c) => {
    if (stack.includes(c)) {
      // if we run into a duplicate, save the current length of the stack if largest so far
      // and start over with the new/duplicate letter
      stack = [];
    }

    // push letter onto stack
    stack.push(c);
    maxLength = maxLength > stack.length ? maxLength : stack.length;
  });

  return maxLength;
}

// console.log("Result: ", lengthOfLongestSubstring(string));

// group anagrams
function groupAnagrams(strs) {
  const table = new Map();

  strs.forEach((s) => {
    let sortedWord = s.split("").sort().join("");

    // this doesnt work since .values() is a method from Map();
    if (!table[sortedWord]) {
      table[sortedWord] = [s];
    } else {
      table[sortedWord].push(s);
    }

    // sol'n
    if (!table.has(sortedWord)) {
      table.set(sortedWord, []);
    }

    // Push the original string to the array corresponding to the sorted key
    table.get(sortedWord).push(s);
  });

  console.log("table: ", table);

  return Array.from(table.values());
}

// trapping rain water
function trap(height) {
  if (height.length === 0) return 0;

  // use 2 pointers, one at each side
  // take the max of the left and max of the right, then take min of those 2
  // subtract the height of the column
  // move pointer that is smaller, if they are the same it doesnt matter which to move

  let pointerL = 0,
    pointerR = height.length - 1;
  let maxL = 0,
    maxR = 0;
  let totalVolume = 0;

  while (pointerL < pointerR) {
    if (height[pointerL] < height[pointerR]) {
      maxL = Math.max(height[pointerL], maxL);
      totalVolume += maxL - height[pointerL];
      pointerL++;
    } else {
      maxR = Math.max(height[pointerR], maxR);
      totalVolume += maxR - height[pointerR];
      pointerR--;
    }
  }
  return totalVolume;
}
// height=[0,2,0,3,1,0,1,3,2,1];

// console.log('result: ', trap(height));
// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// let nums=[-1,0,1,2,-1,-4];
// let nums=[1,-1,-1,0];
// console.log(threeSum(nums));

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

process.exit();
