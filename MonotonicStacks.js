
// Given an array of integers temperatures represents the daily temperatures, 
// return an array answer such that answer[i] is the number of days you have to wait 
// after the ith day to get a warmer temperature. If there is no future day for which 
// this is possible, keep answer[i] == 0 instead.

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {

    // create results array the size of temperatures and fill with 0.
    let res = new Array(temperatures.length).fill(0);
    let stack = [];             // [temp, index], monotonic decreasing stack

    // iterate temperatures array
    for (let i = 0; i < temperatures.length; i++) {
      let temp = temperatures[i];

      // if temp is > the temp on the top of the stack we pop the stack and res at the index of the popped temp.
      // loop continues until value at top of the stack is < temp, or stack is empty
      while (stack && temp > temperatures[stack[stack.length-1]]) {
        const index = stack.pop();                  // NOTE: push/pop are faster than shfit/unshift
        res[index] = i - index;
      }

      // push index to the stack
      stack.push(i); 
    }

    return res; 
};