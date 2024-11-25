// Given a string s, find the length of the longest
// substring
// without repeating characters.

// Examples: 
// abcabcbb, 3
// bbbbb, 1
// pwwkew, 3
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
      let start = 0;
      const chars = new Array(128).fill(-1);
      
      for (let end = 0; end < s.length; end++) {
          const charCode = s.charCodeAt(end);
          start = Math.max(start, chars[charCode] + 1);         // move start to char that begining of first repetition
          chars[charCode] = end;                                // move end to character that repeated
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

const s1 = "abcabcbb";
console.log(lengthOfLongestSubstring_atMost2Repeat(s1)); // Expected output: 6

const s2 = "bbbbb";
console.log(lengthOfLongestSubstring_atMost2Repeat(s2)); // Expected output: 2

const s3 = "pwwkew";
console.log(lengthOfLongestSubstring_atMost2Repeat(s3)); // Expected output: 5

const s4 = "aabacbebebe";
console.log(lengthOfLongestSubstring_atMost2Repeat(s4)); // Expected output: 6

const s5 = "eceba";
console.log(lengthOfLongestSubstring_atMost2Repeat(s5)); // Expected output: 5

const s6 = "abcabcabc";
console.log(lengthOfLongestSubstring_atMost2Repeat(s6)); // Expected output: 6