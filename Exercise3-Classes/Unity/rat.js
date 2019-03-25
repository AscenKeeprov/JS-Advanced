class Rat {
	constructor(name) {
		this.name = name;
		this.unitedRats = [];
	}
	getRats() {
		return this.unitedRats;
	}
	toString() {
		let string = [`${this.name}`];
		for (let rat of this.unitedRats) {
			string.push(`##${rat.name}`);
		}
		return string.join('\n');
	}
	unite(otherRat) {
		if (otherRat instanceof Rat) {
			this.unitedRats.push(otherRat);
		}
	}
}

let rat = new Rat('Pesho');
console.log(rat.toString());
console.log(rat.getRats());
rat.unite(new Rat('Gosho'));
rat.unite(new Rat('Sasho'));
console.log(rat.getRats());
console.log(rat.toString());
