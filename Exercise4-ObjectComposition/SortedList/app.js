function ListOfNumbersInAscendingOrder() {
	return (() => {
		let numbers = [];
		let size = 0;
		function validateIndex(index) {
			if (!Number.isInteger(index)) throw new TypeError('Index must be an integer!');
			if (index < 0 || index >= numbers.length) throw new RangeError('Index out of range!');
		}
		return {
			add: function (number) {
				if (isNaN(number)) throw new TypeError('Only numbers can be added to the list!');
				numbers.push(number);
				numbers.sort((n1, n2) => n1 - n2);
				this.size++;
			},
			get: function (index) {
				validateIndex(index);
				return numbers[index];
			},
			remove: function (index) {
				validateIndex(index);
				numbers.splice(index, 1);
				this.size--;
			},
			size
		};
	})();
}

let list = ListOfNumbersInAscendingOrder();
list.size;
list.get(0);
list.remove(0);
list.remove(-1);
list.remove(1.1);
list.add();
list.add(1);
list.add(2);
list.add(1.1);
list.get(1);
list.add(1.01);
list.size;
list.get(1);
list.remove();
list.remove(4);
list.remove(3);
list.remove(0);
list.size;
