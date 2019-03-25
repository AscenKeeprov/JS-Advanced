function solve() {
	return (function () {
		let storage = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };
		const recipes = {
			'apple': { carbohydrate: 1, flavour: 2 },
			'burger': { carbohydrate: 5, fat: 7, flavour: 3 },
			'cheverme': { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
			'coke': { carbohydrate: 10, flavour: 20 },
			'omelet': { protein: 5, fat: 1, flavour: 1 }
		};
		return function (command) {
			let commandArgs = command.split(' ');
			let action = commandArgs[0].toUpperCase();
			switch (action) {
				case 'PREPARE':
					let recipeName = commandArgs[1].toLowerCase();
					let recipeQuantity = Number(commandArgs[2]);
					let neededMicroelements = Object.entries(recipes[recipeName])
						.map(kvp => [kvp[0], kvp[1] * recipeQuantity]);
					for (let [microelement, neededQuantity] of neededMicroelements) {
						if (storage[microelement] < neededQuantity)
							return `Error: not enough ${microelement} in stock`;
					}
					for (let [microelement, neededQuantity] of neededMicroelements) {
						storage[microelement] -= neededQuantity;
					}
					return 'Success';
				case 'REPORT': return Object.entries(storage)
					.map(kvp => `${kvp[0]}=${kvp[1]}`).join(' ');
				case 'RESTOCK':
					let microelement = commandArgs[1];
					let quantity = Number(commandArgs[2]);
					storage[microelement] += quantity;
					return 'Success';
			}
		};
	})();
}
let solution = solve();

solution('restock carbohydrate 10');
solution('restock flavour 10');
solution('prepare apple 1');
solution('restock fat 10');
solution('prepare burger 1');
solution('report');

solution('prepare cheverme 1');
solution('restock protein 10');
solution('prepare cheverme 1');
solution('restock carbohydrate 10');
solution('prepare cheverme 1');
solution('restock fat 10');
solution('prepare cheverme 1');
solution('restock flavour 10');
solution('prepare cheverme 1');
solution('report');
