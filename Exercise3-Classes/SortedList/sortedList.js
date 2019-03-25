class SortedList {
	constructor() {
		this.collection = [];
		this.size = 0;
	}
	add(element) {
		let index = this.collection.findIndex(e => e > element);
		if (this.collection.length === 0 || index === -1) {
			this.collection.push(element);
		} else this.collection.splice(index, 0, element);
		this.size++;
	}
	get(index) {
		let element = this.collection[index];
		if (element === undefined) throw new RangeError('Index out of range!');
		return element;
	}
	remove(index) {
		if (index < 0 || index >= this.collection.length)
			throw new RangeError('Index out of range!');
		this.collection.splice(index, 1);
		this.size--;
	}
}

let sortedList = new SortedList;
sortedList.remove(0);
sortedList.add(1.09);
sortedList.add(2);
sortedList.add(-2);
console.log(sortedList.get(3));
sortedList.remove(2);
console.log(sortedList.size);
sortedList.add(0.1);
sortedList.add(2.000000001);
console.log(sortedList.get(3));
sortedList.add(0.01);
sortedList.add(1.1);
console.log(sortedList.get(3));
console.log(sortedList.size);
