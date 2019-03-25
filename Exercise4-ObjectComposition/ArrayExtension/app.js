(() => {
	Array.prototype.average = function () {
		let sum = this.reduce((a, b) => a + b, 0);
		return sum / this.length;
	}
	Array.prototype.last = function () {
		return this[this.length - 1];
	}
	Array.prototype.skip = function (n) {
		if (!Number.isInteger(n)) throw new TypeError();
		if (n < 0) throw new RangeError();
		return this.slice(n);
	}
	Array.prototype.sum = function () {
		return this.reduce((a, b) => a + b, 0);
	}
	Array.prototype.take = function (n) {
		if (!Number.isInteger(n)) throw new TypeError();
		if (n < 0) throw new RangeError();
		return this.slice(0, n);
	}
})();