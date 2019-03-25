const assert = require('chai').assert;
const mathEnforcer = require('./mathEnforcer').mathEnforcer;

describe('Math Enforcer', () => {
	describe('AddFive function', () => {
		it('should add 5 to a given number', () => {
			let number = 0;
			let result = mathEnforcer.addFive(number);
			assert.equal(result, 5);
		});

		it('should add 5 to a negative number', () => {
			let number = -4;
			let result = mathEnforcer.addFive(number);
			assert.equal(result, 1);
		});

		it('should add 5 to a floating-point number', () => {
			let number = 3.14;
			let result = mathEnforcer.addFive(number);
			assert.closeTo(result, 8.14, 0.01);
		});

		it(`should return 'undefined' if parameter is not a number`, () => {
			let notANumber = 'NaN';
			let result = mathEnforcer.addFive(notANumber);
			assert.isUndefined(result);
		});
	});

	describe('SubtractTen function', () => {
		it('should subtract 10 from a given number', () => {
			let number = 10;
			let result = mathEnforcer.subtractTen(number);
			assert.equal(result, 0);
		});

		it('should subtract 10 from a negative number', () => {
			let number = -1;
			let result = mathEnforcer.subtractTen(number);
			assert.equal(result, -11);
		});

		it('should subtract 10 from a floating-point number', () => {
			let number = 3.14;
			let result = mathEnforcer.subtractTen(number);
			assert.closeTo(result, -6.86, 0.01);
		});

		it(`should return 'undefined' if parameter is not a number`, () => {
			let notANumber = 'NaN';
			let result = mathEnforcer.subtractTen(notANumber);
			assert.isUndefined(result);
		});
	});

	describe('Sum function', () => {
		it('should sum two numbers', () => {
			let number1 = 1;
			let number2 = 2;
			let result = mathEnforcer.sum(number1, number2);
			assert.equal(result, 3);
		});

		it('should sum two negative numbers', () => {
			let number1 = -1;
			let number2 = -2;
			let result = mathEnforcer.sum(number1, number2);
			assert.equal(result, -3);
		});

		it('should sum two floating-point numbers', () => {
			let number1 = 1.61803398875;
			let number2 = 3.14159265359;
			let result = mathEnforcer.sum(number1, number2);
			assert.closeTo(result, 4.75, 0.01);
		});

		it(`should return 'undefined' if the first parameter is not a number`, () => {
			let notANumber = 'NaN';
			let number2 = 2;
			let result = mathEnforcer.sum(notANumber, number2);
			assert.isUndefined(result);
		});

		it(`should return 'undefined' if the second parameter is not a number`, () => {
			let number1 = 1;
			let notANumber = 'NaN';
			let result = mathEnforcer.sum(number1, notANumber);
			assert.isUndefined(result);
		});
	});
});
