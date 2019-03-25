const assert = require('chai').assert;
const isOddOrEven = require('./hasEvenOrOddLength').hasEvenOrOddLength;

describe('String length measure function', () => {
	it(`should return 'even' if string length is an even number`, () => {
		let string = 'Even';
		let result = isOddOrEven(string);
		assert.equal(result, 'even');
	});

	it(`should return 'odd' if string length is an odd number`, () => {
		let string = 'Odd';
		let result = isOddOrEven(string);
		assert.equal(result, 'odd');
	});

	it(`should return 'undefined' if input is not a string`, () => {
		let number = 1337;
		let result = isOddOrEven(number);
		assert.equal(result, undefined);
	});

	it(`should return 'undefined' if string is undefined`, () => {
		let string = undefined;
		let result = isOddOrEven(string);
		assert.equal(result, undefined);
	});
});
