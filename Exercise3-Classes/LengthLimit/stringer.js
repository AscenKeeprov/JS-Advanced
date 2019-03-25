class Stringer {
	constructor(string, length) {
		this.innerLength = length;
		this.innerString = string;
	}
	decrease(length) {
		if (length >= this.innerLength) this.innerLength = 0;
		else this.innerLength -= length;
	}
	increase(length) {
		this.innerLength += length;
	}
	toString() {
		let string = this.innerString.substr(0, this.innerLength);
		if (string.length < this.innerString.length) string += '...';
		return string;
	}
}

let stringer = new Stringer('Test', 5);
console.log(stringer.toString());
stringer.decrease(3);
console.log(stringer.toString());
stringer.decrease(5);
console.log(stringer.toString());
stringer.increase(4);
console.log(stringer.toString());
