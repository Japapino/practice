// these are various ways to solve a 2-sum problem

// 2-pointer
// O(n) space
// O(1) time
const twoSum_twoPointer = (numbers, target) => {
    // Questions
    // all ready sorted
    // can the numbers be zero or negative? decimals? fractions?
    // cannot be the same number
    // must use O(1) space, meaning nested loops are out

    // Return object
    // The 2 numbers will be returned as their respective indexes in a size 2 array

    let result = [];
    let len = numbers.length;
    let r = len-1;

    while (l < r) {
        const sum = numbers[l] + numbers[r]; 
        if (sum == target) return [l+1,r+1];
        if (sum > target) r--;
        if (sum < target) l++;
    }

    return []; 

}

// Binary Serach
// Binary search requires a sorted array and will continuously 
// split the array in half and check if the target value is above or below the halway point specified. 
// In this case we are assuming the numbers are sorted and all positive
// O(1) Space
// O(n log n) Time
const twoSum_binary = (numbers, target) => {
    // For each number, we calculate the difference from target and check if it's in the array. 
    for (let i = 0; i < numbers.length; i++) {
        let l = i+1;
        let r = numbers.length - 1;
        let diff2Target = target - numbers[i];

        while (l <= r) {                                // insted of using a temp variable for the test array we are moving the left and right bounds. we dont need the whole array, just the mid value of the new array
            let mid = l + Math.floor((r - l) / 2);      // notice this is LEFT POINTER + (mid value between r and l), to find the middle value of the new array NOT the middle value of the difference
            if (numbers[mid] === diff2Target) {
                return [i + 1, mid + 1];
            } else if (numbers[mid] < diff2Target) {
                l = mid +1;                             
            } else {
                r = mid -1; 
            }
        }
    }
};

const numbers = [1,2,3,4];
const target = 3;

// Map solution, fasteset and best
// O(n) space
// O(n) time
const twoSum_map = (numbers, target) => {
    const mp = new Map();
    for (let i = 0; i < numbers.length; i++) {
        const tmp = target - numbers[i];
        if (mp.has(tmp)) {
            return [mp.get(tmp), i + 1];
        }
        mp.set(numbers[i], i + 1);
    }
    return [];
}