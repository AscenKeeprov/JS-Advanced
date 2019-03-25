let solution = (function () {
	const add = (vec1, vec2) => [vec1[0] + vec2[0], vec1[1] + vec2[1]];
	const cross = (vec1, vec2) => vec1[0] * vec2[1] - vec1[1] * vec2[0];
	const dot = (vec1, vec2) => vec1[0] * vec2[0] + vec1[1] * vec2[1];
	const length = (vec) => Math.sqrt(vec[0] ** 2 + vec[1] ** 2);
	const multiply = (vec, scalar) => [vec[0] * scalar, vec[1] * scalar];
	return { add, cross, dot, length, multiply };
})();

solution.multiply([3.5, -2], 2);
solution.length([3, -4]);
solution.dot([1, 0], [0, -1]);
solution.cross([3, 7], [1, 0]);
solution.add([1, 1], [1, 0]);
