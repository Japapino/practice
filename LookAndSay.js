
function LookAndSay(n) {
    // given n, run look and say 'n' times

    const result = [];
    result.push(1);

    for (let i = 0; i < n; i++) {
        const val = result[i].toString().split('');
        let temp = [];
        let last = '';
        let count = 0; 

        val.forEach((n)=> {
            if (n != last && !!last) {
                temp.push(count);
                temp.push(last);
                count = 0;
            } 

            last = n;
            count++;
        });

        temp.push(count);
        temp.push(last);

        result.push(Number(temp.join('')));
        console.log('results: ', result);
    }

    return result; 
};

console.log(LookAndSay(3)); // Expected output: [1, [1, 1], [2, 1], [1, 2, 1, 1]]

console.log(LookAndSay(4)); // Expected output: [1, [1, 1], [2, 1], [1, 2, 1, 1], [1, 1, 1, 2, 2, 1]]

console.log(LookAndSay(5)); // Expected output: [1, [1, 1], [2, 1], [1, 2, 1, 1], [1, 1, 1, 2, 2, 1], [3, 1, 2, 2, 1, 1]]
