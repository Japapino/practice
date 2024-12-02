// Given a string s, find the length of the longest
// substring
// without repeating characters.

// Examples:
// abcabcbb, 3
// bbbbb, 1
// pwwkew, 3
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  let start = 0;
  const chars = new Array(128).fill(-1);

  for (let end = 0; end < s.length; end++) {
    const charCode = s.charCodeAt(end);
    start = Math.max(start, chars[charCode] + 1); // move start to char that begining of first repetition
    chars[charCode] = end; // move end to character that repeated
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
};

function lengthOfLongestSubstring_atMost2Repeat(s) {
  let maxLen = 0;
  let l = 0;
  let charArray = Array.from({ length: 128 }, () => []);

  for (let r = 0; r < s.length; r++) {
    const charCode = s.charCodeAt(r);
    const charVal = charArray[charCode];

    if (charVal.length > 1) {
      charVal.shift();
      l = charVal[0];
    }

    charArray[charCode].push(r);
    maxLen = Math.max(maxLen, r - l + 1);
  }

  return maxLen;
}

// const s1 = "abcabcbb";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s1)); // Expected output: 6

// const s2 = "bbbbb";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s2)); // Expected output: 2

// const s3 = "pwwkew";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s3)); // Expected output: 5

// const s4 = "aabacbebebe";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s4)); // Expected output: 6

// const s5 = "eceba";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s5)); // Expected output: 5

// const s6 = "abcabcabc";
// console.log(lengthOfLongestSubstring_atMost2Repeat(s6)); // Expected output: 6

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome_main_simplified = function (s) {
  // given a string, return the longest substring that is the same forward and reversed

  // so we are going to use a sliding window approach, for that we need two pointers starting at the begining and begining +1

  // so our solution doesnt work for larger strings, we have to rethink our approach. instead of staring at the begining and and end and working inward.
  // we change our solution to work outwork looking at each set.
  // this should reduce the amount of runs also

  // using each letter of the string as the center, we slowly expand out until we dont have a palindrom, then continue.
  if (s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i); // Odd length palindromes
    const len2 = expandAroundCenter(i, i + 1); // Even length palindromes
    const len = Math.max(len1, len2);

    if (len > maxLength) {
      maxLength = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLength);
};

function longestPalindrome_alt(s) {
  let length = s.length; // Longest possible palindrome
  let start = 0;
  for (let i = 0; i + length <= s.length; i++) {
    let left = i;
    let right = length - 1 + i; // This calculates the size of the window
    let found = false; // Just a boolean to keep track of whether or not we found a solution. The first solution we find is automatically the longest
    
    while (s[left] === s[right]) {
      if (left >= right) {
        // This will handle both even and odd length strings
        found = true; // We found a solution so we can stop
        start = i; // Reset the start position to the initial index (i) we started with. We will use this for returning the substring
        break;
      }
      left++;
      right--;
    }

    if (found) {
      break;
    } else {
      right = length - 1 + i; // We haven't found a solution this time so we move the right position by 1. The for loop will add 1 to index (i) so the  window will move 1 spot to the right.
    }
    if (right === s.length - 1) {
      // Need to check if the window hasn't moved beyond the end of the string
      i = -1; // We set i to -1 because the for loop will add 1 once we reenter the loop, changing it back to 0;
      length--; // Reduce the size of the window by 1
    }
  }
  return s.substring(start, length + start);
}
