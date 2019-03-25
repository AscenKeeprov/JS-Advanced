let iife = (function () {
	let sum = 0;
	function add(number) {
		sum += number;
		return add;
	}
	add.toString = () => { return sum };
	return add;
})();

iife(1)(-3).toString();
iife(1).toString();