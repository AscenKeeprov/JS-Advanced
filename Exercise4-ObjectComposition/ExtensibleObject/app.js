function ExtensibleObject() {
	return {
		extend: function (objectTemplate) {
			for (let [key, value] of Object.entries(objectTemplate)) {
				if (value instanceof Function) {
					Object.getPrototypeOf(this)[key] = value;
				} else this[key] = value;
			}
		}
	};
}

let extensibleObject = ExtensibleObject();
extensibleObject.extend({
	name: 'John Doe',
	greet: () => console.log('Greetings!'),
	age: 29,
})
console.log(extensibleObject);
