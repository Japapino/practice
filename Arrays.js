/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canMakeSubsequence = function (str1, str2) {
  // we can use charCodeAt to determine the letter, and increment the to the next.
  // can use fromCharCode to generate new char
  // str.fromCharCode(97, 98, 122) -> abz

  // look at str1, get char codes
  // look at str2, get char codes
  // compare to see if there is only one letter we need to change by 1 to make substring

  // we can use a while loop to increment both pointers.
  // we start the loop comparing at the begining of each str.
  // if 1 doesnt match up by 1 we can take note, by flipping a boolean.
  // if more than one char is off by 1 we can conclude it's not possible and return false

  // incase we dont find what we are looking for we move on to the next
  let p1 = 0;
  let p2 = 0;
  while (p1 < str1.length && p2 < str2.length) {
    const code2 = str2.charCodeAt(p2);
    const code1 = str1.charCodeAt(p1);

    // if they're the same, continue -> increment both
    if (code1 == code2) {
      p2++;

      // if they are off by 1, flip 'updated' bool and continue -increment both
    } else if (code1 + 1 == code2 || (code1 == 122 && code2 == 97)) {
      p2++;
      updated = true;

      // if they are off by more than 1 -> increment p1.
    }

    if (p2 >= str2.length) return true;

    p1++;
  }

  return false;
};

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  // a sub array is special if it's numbers alternate between even and odd.
  // given an array 'nums', and a 2D array 'queries'. Return and array such that result[i] describes if quries[i] is special.

  // as expected, larger datasets take too long. we can add a map for memoization. save values in map so we don't have to check
  // values we have in the past.
  let res = []; // array of booleans
  // create prefix array which keeps track number of bad pairs up to i
  let prefix = Array(nums.length).fill(0);

  // find all bad pairs, and increment if we run into ones so it's always increasing
  for (let n = 1; n < nums.length; n++) {
    prefix[n] = prefix[n - 1];
    if (
      (nums[n - 1] % 2 == 0 && nums[n] % 2 == 0) ||
      (nums[n - 1] % 2 != 0 && nums[n] % 2 != 0)
    ) {
      prefix[n]++;
    }
  }
  console.log(prefix);
  // if the prefix increases from left to right, then we found a bad pair in the range
  for (let q of queries) {
    console.log([prefix[q[1]], prefix[q[0]]]);
    const count = prefix[q[1]] - prefix[q[0]];
    res.push(count == 0);
  }

  return res;
};

// #region MaxLengthSubStringThrice

// longest substring that repeats at least 3 times
/**
 * @param {string} s
 * @return {number}
 */
var maximumLength_old = function (s) {
  let n = s.length;
  let l = 1,
    r = n;

  if (!helper(s, n, l)) return -1; // check if whole string is special

  // while our window is at least 1 char long
  // starting window is length of string
  while (l + 1 < r) {
    let mid = Math.floor((l + r) / 2); // find middle of window
    if (helper(s, n, mid)) l = mid; //
    else r = mid;
  }

  return l;
};

// this checks if the substring is special (same char 3+ times)
/**
 * @param {string} s
 * @param {number} n // length of string
 * @param {number} x // left side of window start
 * @return {boolean}
 */
function helper(s, n, x) {
  let cnt = new Array(26).fill(0); // fill array of size 26 with 0's
  let p = 0;

  for (let i = 0; i < n; i++) {
    while (s[p] !== s[i]) p++; // increment p if the p and i are different chars, start at 0 so p always at least 1; p is the left window side
    if (i - p + 1 >= x) cnt[s[i].charCodeAt(0) - "a".charCodeAt(0)]++; // if window from i to p is greater than the mid length,
    //increment charCode value of letter
    if (cnt[s[i].charCodeAt(0) - "a".charCodeAt(0)] > 2) return true; // if the value > 2 return true;
  }

  return false;
}

// #endregion

// #region MaxLengthSubStringThrice2

// this way is easier to understand and visualize then the previous
// We keep an 26x3 array, of all the characters and
// we find the top 3 longest strings of each character
// then pick the smaller number. Becuase if the smaller string will appear in the larger ones also.
// video: https://www.youtube.com/watch?v=PHKPcheMkyU
/**
 * @param {string} s
 * @return {number}
 */
function maximumLength_better(s) {
  const len = s.length;
  let top3freq = Array(26)
    .fill()
    .map(() => Array(3).fill(-1));
  let lastSeen = "*";
  let winLen = 0;

  // find top 3 substring lengths for each char.
  for (let i = 0; i < len; i++) {
    // get char code of letter and check if is the same as the last seen letter
    let charIdx = s[i].charCodeAt(0) - "a".charCodeAt(0);
    winLen = s[i] == lastSeen ? winLen + 1 : 1;
    lastSeen = s[i];

    // find lowest value and update it if window length is larger
    let min = Math.min(...top3freq[charIdx]);
    let minIdx = top3freq[charIdx].indexOf(min);
    if (winLen > min) top3freq[charIdx][minIdx] = winLen;
  }

  let maxLen = -1;
  for (let j = 0; j < 26; j++) {
    maxLen = Math.max(maxLen, Math.min(...top3freq[j]));
  }

  return maxLen;
}

let str = "abcccccdddd";
// console.log(maximumLength(str));

// #endregion

// #region continuous subarrays

// You are given a 0-indexed integer array nums. A subarray of nums is called continuous if:
//     Let i, i + 1, ..., j be the indices in the subarray. Then, for each pair of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
// Return the total number of continuous subarrays.

/**
 * @param {number[]} nums
 * @return {number}
 */
var continuousSubarrays = function (nums) {
  let mp = new Map();
  let l = 0;
  let r = 0;
  let count = 0;

  // right side iterates array
  for (; r < nums.length; r++) {
    console.log(mp);
    console.log([l, r]);
    // set number to key, and index to value. {number} -> {index}
    mp.set(nums[r], r);
    // if the difference between the largest and smallest key > 2
    if (Math.max(...mp.keys()) - Math.min(...mp.keys()) > 2) {
      // if the largest index is smaller than the smallest index?
      if (Math.max(...mp.values()) < Math.min(...mp.values())) {
        console.log("max");
        l = Math.max(...mp.values()) + 1;
        mp.delete(Math.max(...mp.keys()));
      } else {
        console.log("min");

        l = Math.min(...mp.values()) + 1;
        mp.delete(Math.min(...mp.keys()));
      }
    }

    count += r - l + 1;
  }

  return count;
};

let nums = [5, 4, 2, 4];

console.log(continuousSubarrays(nums));

// #endregion
