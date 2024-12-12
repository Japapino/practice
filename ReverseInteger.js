/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    // so we are given an integer 'x' as a number and we want to reverse the order of numbers and return that number
    // the number is 32-bit and if the 'reversed' number is more than 32-bit we want to return 0
    // integer is signed

    // the first thought is to convert to string then array and reverse using loop
    // but we can do the same with math opertions so no need to convert

    // now we are failing because the number is more than 32-bit, should have returned 0

    let res = 0; 
    let isNegative = x < 0;
    let num = isNegative ? x * -1 : x; 

    // 2,143,847,412
    // 2,147,483,647
    const max = 2147483647;
    // 214,748,364
    const max_close = Math.floor(max / 10);
    const maxLastNum = max % 10; 
 
    while (num > 0) {
        if (res > max_close || (res == max_close && num > maxLastNum)) return 0;
         
        let temp = num % 10;
        res = res * 10 + temp; 
  
        num = Math.floor(num / 10);

    } 

    return isNegative ? res * -1 : res;
};