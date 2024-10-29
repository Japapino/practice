const { expect } = require('mocha');

it('should handle arrays with negative numbers', (done) => {
    const input = [1, -2, [3, -4, [-5]]];
    const expected = [1, -2, 3, -4, -5];
    const result = flattenArray(input);
    expect(result).to.deep.equal(expected);
    done();
});

it('should handle arrays with Infinity and -Infinity', (done) => {
    const input = [1, Infinity, [-Infinity, [2]]];
    const expected = [1, Infinity, -Infinity, 2];
    const result = flattenArray(input);
    expect(result).to.deep.equal(expected);
    done();
});