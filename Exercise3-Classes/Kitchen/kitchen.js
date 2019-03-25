class Kitchen {
	constructor(budget) {
		this.actionsHistory = [];
		this.budget = budget;
		this.menu = {};
		this.productsInStock = {};
	}
	addToMenu(dish, ingredientsList, price) {
		if (!this.menu.hasOwnProperty(dish)) {
			let ingredients = {};
			for (let entry of ingredientsList) {
				let ingredientInfo = entry.split(' ');
				let ingredientName = ingredientInfo[0];
				let ingredientQuantity = Number(ingredientInfo[1]);
				if (!ingredients.hasOwnProperty(ingredientName)) {
					ingredients[ingredientName] = ingredientQuantity;
				} else ingredients[ingredientName] += ingredientQuantity;
			}
			this.menu[dish] = { ingredients, price };
			return `Great idea! Now with the ${dish} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
		} else return `The ${dish} is already in our menu, try something different.`
	}
	loadProducts(productsList) {
		for (let product of productsList) {
			let productInfo = product.split(' ');
			let productName = productInfo[0];
			let productQuantity = Number(productInfo[1]);
			let productPrice = Number(productInfo[2]);
			if (this.budget >= productPrice) {
				if (!this.productsInStock.hasOwnProperty(productName)) {
					this.productsInStock[productName] = productQuantity;
				} else this.productsInStock[productName] += productQuantity;
				this.budget -= productPrice;
				this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`);
			} else this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`);
		}
		return this.actionsHistory.join('\n');
	}
	makeTheOrder(dish) {
		if (this.menu.hasOwnProperty(dish)) {
			let productsToUse = {};
			let ingredientNames = Object.keys(this.menu[dish].ingredients);
			for (let name of ingredientNames) {
				let neededQuantity = this.menu[dish].ingredients[name];
				if (this.productsInStock[name] === undefined || this.productsInStock[name] < neededQuantity)
					return `For the time being, we cannot complete your order (${dish}), we are very sorry...`;
				productsToUse[name] = neededQuantity;
			}
			for (let name of Object.keys(productsToUse)) {
				this.productsInStock[name] -= productsToUse[name];
			}
			this.budget += this.menu[dish].price;
			return `Your order (${dish}) will be completed in the next 30 minutes and will cost you ${this.menu[dish].price}.`;
		} else return `There is not ${dish} yet in our menu, do you want to order something else?`;
	}
	showTheMenu() {
		let menuList = '';
		for (let dish of Object.keys(this.menu)) {
			menuList += `${dish} - $ ${this.menu[dish].price}\n`;
		}
		if (!menuList) return 'Our menu is not ready yet, please come later...';
		return menuList.trim();
	}
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts([
	'Banana 10 5',
	'Banana 20 10',
	'Strawberries 50 30',
	'Yogurt 10 10',
	'Yogurt 500 1500',
	'Honey 5 50'
]));
console.log(kitchen.addToMenu(
	'frozenYogurt',
	[
		'Yogurt 1',
		'Honey 1',
		'Banana 1',
		'Strawberries 10'
	],
	9.99
));
console.log(kitchen.addToMenu(
	'Pizza',
	[
		'Flour 0.5',
		'Oil 0.2',
		'Yeast 0.5',
		'Salt 0.1',
		'Sugar 0.1',
		'Tomato sauce 0.5',
		'Pepperoni 1',
		'Cheese 1.5'
	],
	15.55
));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder('frozenYogurt'));
