const assert = require('chai').assert;
const lookupChar = require('./lookupChar').lookupChar;

describe('Char lookup function', () => {
	it('should return character at a given index in a string when input is valid', () => {
		let string = 'Valid';
		let index = 0;
		let result = lookupChar(string, index);
		assert.equal(result, 'V');
	});

	it(`should return 'undefined' when input is not provided`, () => {
		let result = lookupChar();
		assert.isUndefined(result);
	});

	it(`should return 'undefined' if first parameter is not a string`, () => {
		let object = {};
		let index = 0;
		let result = lookupChar(object, index);
		assert.isUndefined(result);
	});

	it(`should return 'undefined' if index is not a number`, () => {
		let string = 'Valid';
		let object = {};
		let result = lookupChar(string, object);
		assert.isUndefined(result);
	});

	it(`should return 'undefined' if index is not an integer`, () => {
		let string = 'Valid';
		let index = 3.14;
		let result = lookupChar(string, index);
		assert.isUndefined(result);
	});

	it('should return error message if string is empty', () => {
		let string = '';
		let index = 0;
		let result = lookupChar(string, index);
		assert.equal(result, 'Incorrect index');
	});

	it('should return error message if index is negative', () => {
		let string = 'Valid';
		let index = -2;
		let result = lookupChar(string, index);
		assert.equal(result, 'Incorrect index');
	});

	it('should return error message if index is equal to string length', () => {
		let string = 'Valid';
		let index = string.length;
		let result = lookupChar(string, index);
		assert.equal(result, 'Incorrect index');
	});

	it('should return error message if index is greater than string length', () => {
		let string = 'Valid';
		let index = string.length + 1;
		let result = lookupChar(string, index);
		assert.equal(result, 'Incorrect index');
	});
});
