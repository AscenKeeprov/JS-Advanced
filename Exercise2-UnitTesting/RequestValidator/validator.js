function validateRequest(request) {
	const throwInvalidHeaderError = function (header) {
		throw new Error(`Invalid request header: Invalid ${header}`);
	};
	const validMethods = ['CONNECT', 'DELETE', 'GET', 'POST'];
	const validUriRegExp = /^(\*|[a-zA-Z0-9.]+)$/g;
	const validVersionRegExp = /^HTTP\/(0\.9|1\.[01]|2\.0)$/g;
	const validMessageRegExp = /^[^<>\\&"']*$/g;
	if (!request.hasOwnProperty('method')
		|| !validMethods.includes(request.method))
		throwInvalidHeaderError('Method');
	if (!request.hasOwnProperty('uri')
		|| !validUriRegExp.test(request.uri))
		throwInvalidHeaderError('URI');
	if (!request.hasOwnProperty('version')
		|| !validVersionRegExp.test(request.version))
		throwInvalidHeaderError('Version');
	if (!request.hasOwnProperty('message')
		|| !validMessageRegExp.test(request.message))
		throwInvalidHeaderError('Message');
	return request;
}

module.exports.validateRequest = validateRequest;