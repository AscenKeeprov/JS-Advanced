let solution = (() => {
	let lastId = -1;
	return class Extensible {
		constructor() {
			this.id = ++lastId;
		}
		extend(template) {
			for (let property of Object.keys(template)) {
				if (template[property] instanceof Function) {
					Object.getPrototypeOf(this)[property] = template[property];
				} else this[property] = template[property];
			}
		}
	};
})();

let extensible = new solution;

let object = { id: 1337, do: function () { console.log('Doing...') } };
extensible.extend(object);
console.log(extensible);

let extensible1 = new solution;
let extensible2 = new solution;
let extensible3 = new solution;
console.log(extensible1.id);
console.log(extensible2.id);
console.log(extensible3.id);
