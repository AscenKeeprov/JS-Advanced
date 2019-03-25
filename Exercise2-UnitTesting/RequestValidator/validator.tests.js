const assert = require('chai').assert;
const validateRequest = require('./validator').validateRequest;

describe('Validator', () => {
	it('should return request if it is valid', () => {
		let request = {
			method: 'GET',
			uri: 'svn.public.catalog',
			version: 'HTTP/1.1',
			message: ''
		};
		let result = validateRequest(request);
		assert.equal(result, request);
	});

	it('should throw an error if request header is missing', () => {
		let request = {
			uri: 'svn.public.catalog',
			version: 'HTTP/1.0',
			message: ''
		};
		assert.throws(() => { validateRequest(request) }, Error, 'Invalid request header: Invalid Method');
	});

	it('should throw an error if request method is not valid', () => {
		let request = {
			method: 'SET',
			uri: 'svn.public.catalog',
			version: 'HTTP/1.1',
			message: ''
		};
		assert.throws(() => { validateRequest(request) }, Error, 'Invalid request header: Invalid Method');
	});

	it('should throw an error if request URI is not valid', () => {
		let request = {
			method: 'GET',
			uri: '%appdata%',
			version: 'HTTP/1.1',
			message: ''
		};
		assert.throws(() => { validateRequest(request) }, Error, 'Invalid request header: Invalid URI');
	});

	it('should throw an error if request version is not valid', () => {
		let request = {
			method: 'GET',
			uri: 'svn.public.catalog',
			version: 'HTTP/2.1',
			message: ''
		};
		assert.throws(() => { validateRequest(request) }, Error, 'Invalid request header: Invalid Version');
	});

	it('should throw an error if request message is not valid', () => {
		let request = {
			method: 'GET',
			uri: 'svn.public.catalog',
			version: 'HTTP/2.0',
			message: '<script>alert("xss vulnerable")</script>'
		};
		assert.throws(() => { validateRequest(request) }, Error, 'Invalid request header: Invalid Message');
	});
});
