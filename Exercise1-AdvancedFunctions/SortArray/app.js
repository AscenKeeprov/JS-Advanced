function sortArray(array, sortMethod) {
	let sortMethods = {
		'ASC': (a, b) => a - b,
		'DESC': (a, b) => b - a,
	}
	return array.sort(sortMethods[sortMethod.toUpperCase()]);
}

sortArray([14, 7, 17, 6, 8], 'asc');
sortArray([14, 7, 17, 6, 8], 'desc');
