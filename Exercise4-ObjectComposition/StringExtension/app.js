(() => {
	String.format = function (string, ...params) {
		for (let i = 0; i < params.length; i++) {
			string = string.replace(`{${i}}`, params[i]);
		}
		return string;
	}
	String.prototype.ensureEnd = function (string) {
		if (this.endsWith(string)) return this.toString();
		return `${this}${string}`;
	}
	String.prototype.ensureStart = function (string) {
		if (this.startsWith(string)) return this.toString();
		return `${string}${this}`;
	}
	String.prototype.isEmpty = function () {
		return this.length === 0;
	}
	String.prototype.truncate = function (n) {
		if (!Number.isInteger(n)) throw new TypeError();
		if (n < 0) throw new RangeError();
		if (n < 4) return '.'.repeat(n);
		if (this.length <= n) return this.toString();
		let truncatedString = this.slice(0, n - 2);
		let lastIndexOfSpace = truncatedString.lastIndexOf(' ');
		if (lastIndexOfSpace === -1) return `${truncatedString}...`;
		return `${this.slice(0, lastIndexOfSpace)}...`;
	}
})();