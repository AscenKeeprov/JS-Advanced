function hasEvenOrOddLength(input) {
	if (typeof (input) !== 'string') return undefined;
	if (input.length % 2 === 0) return 'even';
	return 'odd';
}

module.exports.hasEvenOrOddLength = hasEvenOrOddLength;