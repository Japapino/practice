// class MinStack {
//   stack: number[];
//   minStack: number[];

//   constructor() {
//     this.stack = [];
//     this.minStack = [];
//   }

//   push(val: number): void {
//     this.stack.push(val);

//     if (
//       this.minStack.length == 0 ||
//       this.minStack[this.minStack.length - 1] >= val
//     ) {
//       this.minStack.push(val);
//     }
//   }

//   pop(): void {
//     const top = this.stack.pop();
//     if (top === this.minStack[this.minStack.length - 1]) {
//       this.minStack.pop();
//     }
//   }

//   top(): number {
//     return this.stack[this.stack.length - 1];
//   }

//   getMin(): number {
//     return this.minStack[this.minStack.length - 1];
//   }
// }

// function groupAnagrams(strs: string[]): string[][] {
//   let table = new Map<string, string[]>();

//   strs.forEach((s: string) => {
//     let sortedWord: string = s.split("").sort().join("");

//     if (!table[sortedWord]) {
//       table[sortedWord] = [s];
//     } else {
//       table[sortedWord].push(s);
//     }
//   });

//   return Object.values(table);
// }

// function topKFrequent(nums: number[], k: number): number[] {
//   const table = new Map<number, number>();
//   const bucket: number[][] = [];

//   nums.forEach((n) => {
//     if (!table.get(n)) {
//       table.set(n, 1);
//     } else {
//       const count = table.get(n) || 0;
//       table.set(n, count + 1);
//     }
//   });

//   for (const [num, count] of table.entries()) {
//     if (!bucket[count]) bucket[count] = [];
//     bucket[count].push(num);
//   }

//   let response: number[] = [];

//   for (let idx = bucket.length - 1; idx >= 0; idx--) {
//     console.log("response: ", response);
//     if (!bucket[idx]) continue;

//     for (const num of bucket[idx]) {
//       response.push(num);
//       if (response.length === k) return response;
//     }
//   }

//   return response;
// }

// // better answer
// function topKFrequent1(nums: number[], k: number): number[] {
//   // nums.sort((a, b) => nums.filter(x => x === b).length - nums.filter(x => x === a).length);

//   // const result = [...new Set(nums)]
//   // return result.splice(0, k)
//   let result = {};
//   for (const num of nums) {
//     result[num] = (result[num] ?? 0) + 1;
//   }

//   let arr = Object.keys(result).map((key) => {
//     return { key: Number(key), value: result[key] };
//   });

//   if (arr?.length > 0) {
//     arr.sort((a, b) => b.value - a.value);
//     return arr.map((x) => x.key).splice(0, k);
//   }
//   return [];
// }

// function evalRPN(tokens: string[]): number | undefined {
//   const numCheck = new RegExp(/^-?[0-9]\d*(\.\d+)?$/);
//   let stack: number[] = [];
//   let val: number = 0;
//   for (let i = 0; i < tokens.length; i++) {
//     let n = tokens[i];
//     let isNumber = numCheck.test(n);
//           console.log('value: ', n);
//           console.log('Stack: ', stack);
//       if (isNumber) {
//           stack.push(Number(n));
//       } else {
//           console.log('n: ', n);
//             const a = stack.pop();
//             const b = stack.pop();
//             switch(n) {
//               case "+":
//                 val = b + a;
//                 break;
//               case "-":
//                 val = b - a;
//                 break;
//               case "*":
//                 val = b * a;
//                 break;
//               case "/":
//                 val = b/a > 0 ? Math.floor(b/a) : Math.ceil(b/a);
//                 break;
//               default: console.log('default1: ', n);
//           }
//             stack.push(val);
//         }
//         console.log('===================', val);
//       }
//   return stack.pop();
// };

// function largestRectangleArea(heights: number[]): number {
//   let result = new Array(heights.length).fill(0);
//   let stack: number[] = [];

//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index: number = stack.pop() || 0;
//       result[index] = i - index;
//     }
//     stack.push(i);
//   }

//   result.forEach((v, i) => {
//     result[i] = v == 0 ? result.length - i : v;
//   });

//   console.log("right result: ", result);

//   let result2 = new Array(heights.length).fill(0);
//   let stack2: number[] = [];

//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (
//       stack2.length > 0 &&
//       heights[i] < heights[stack2[stack2.length - 1]]
//     ) {
//       let index: number = stack2.pop() || 0;
//       result2[index] = index - i;
//     }
//     stack2.push(i);
//   }

//   result2.forEach((v, i) => {
//     result2[i] = v == 0 ? i + 1 : v;
//   });

//   // calculate the area
//   let finalResult: number[] = new Array(heights.length).fill(0);
//   for (let i = 0; i < result.length; i++) {
//     finalResult[i] = (result[i] + result2[i] - 1) * heights[i];
//   }

//   console.log("Final result: ", finalResult);

//   return Math.max(...finalResult);
// }

// function largestRectangleArea_optimal(heights: number[]): number {
//   let stack: number[] = [];
//   let area = 0;
//   let i = 0;
//   while (i < heights.length) {
//     if (stack.length === 0 || heights[i] > heights[stack[stack.length - 1]]) {
//       stack.push(i);
//       i++;
//     } else {
//       //end of stack is local max and rest is decreasing
//       const a =
//         heights[stack.pop() as number] *
//         (stack.length === 0 ? i : i - 1 - stack[stack.length - 1]);
//       area = Math.max(area, a);
//     }
//   }
//   // we have to calculate the rest of the stack
//   while (stack.length > 0) {
//     const a =
//       heights[stack.pop() as number] *
//       (stack.length === 0 ? i : i - 1 - stack[stack.length - 1]);
//     area = Math.max(area, a);
//   }
//   return area;
// }

// function twoSum(numbers: number[], target: number): number[] {
//   for (let i = 0; i <= numbers.length; i++) {
//     if ( i > 0 && numbers[i] == numbers[i - 1]) {
//           console.log('skipped');
//       continue;
//     }
//     for (let j = i + 1; j < numbers.length; j++) {
//       console.log(i + 1,j + 1);
//       const result = numbers[i] + numbers[j];
//       if (result == target) {
//         return [i + 1, j + 1];
//       }
//     }
//   }
//   console.log("No result found");
//   return [0, 0];
// }

// function twoSumOptimal(numbers: number[], target: number): number[] {

//   // two pointer approach
//   // since we know that the array is sorted in ascending order we can start at the beginning and end of the array.
//   let left = 0;
//   let right = numbers.length - 1;

//   while (left < right) {
//       const sum = numbers[left] + numbers[right];

//       if (sum === target) return [left + 1, right + 1];
//       if (sum < target) left++;
//       if (sum > target) right--;
//   }

//   return [];
// }
// find product of an array except self
// function productExceptSelf(nums: number[]): number[] {
//   //create answer array
//   let answer: number[] = new Array(nums.length).fill(1);

//   // iterate over input array
//   for (let i = 0 ; i < nums.length-1 ; i++) {
//       if (nums[i] == 1) {
//           continue;
//       } else if ( i == 0 ) {
//           answer[i] = nums.slice(1, nums.length).reduce((a,b) => a * b);
//       } else if ( i == 1 ) {
//           answer[i] = nums[0] * nums.slice(2, nums.length - 1).reduce((a,b) => a * b);
//       } else if ( i == nums.length ) {
//           answer[i] = nums.slice(0, nums.length - 1).reduce((a,b) => a * b);
//       } else {
//           // find left product
//           // find right product
//           // multiply the two together
//           let leftProduct = nums.slice(0, i-1).reduce((a,b) => a * b);
//           let rightProduct = nums.slice(i+1, nums.length).reduce((a,b) => a * b);
//           answer[i] = leftProduct * rightProduct;
//       }
//   }
  

// return answer;
// };

// function productExceptSelf_optimal(nums: number[]): number[] {
//   const answer = new Array(nums.length).fill(1)

//   // find left product
//   let product=1
//   for(let i=0;i<nums.length; i++){
//       answer[i]*=product
//       product*=nums[i]
//   }

//   // find right product
//   product=1
//   for(let i=nums.length-1;i>=0; i--){
//       answer[i]*=product
//       product*=nums[i]
//   }
//   return answer
// };

function longestConsecutive(nums: number[]): number {
  let counts: number[] = [];
  let count: number  = 1; 

  if (nums.length == 0) return 0;
  
  nums.sort((a,b) => a-b );

  // iterate through array
  for (let i = 0; i < nums.length ; i++) {
      // check if current number is in sequence with next number
      if (nums[i] + 1 == nums[i+1]) {
          count++; 
      } else if (nums[i] == nums[i+1]) {
          continue;
      } else {
          // if it isnt then we save the current count and reset the counter;
          counts.push(count);
          count = 1; 
      }
  }

  return Math.max(...counts);

};

longestConsecutive([100, 4, 200, 1, 3, 2]); // 4

// twoSum([0, 0, 0, 0, 0, 2, 7, 11, 15], 9); // [1,2]

// largestRectangleArea([2,1,5,6,2,3]);
// topKFrequent([1, 1, 1, 2, 2, 3], 2); // [1,2]
// groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]); // [["bat"],["nat","tan"],["ate","eat","tea"]]
