class Vacationer {
	constructor(names, creditCardInfo = [1111, '', 111]) {
		this.fullName = names;
		this.generateIDNumber();
		this.addCreditCardInfo(creditCardInfo);
		this.wishList = [];
		return this;
	}
	get fullName() {
		return this._fullName;
	}
	set fullName(names) {
		if (!Array.isArray(names) || names.length !== 3) {
			throw new Error('Name must include first name, middle name and last name');
		}
		if (names.some(n => /^[A-Z][a-z]*$/g.test(n) === false)) {
			throw new Error('Invalid full name');
		}
		this._fullName = {
			firstName: names[0],
			middleName: names[1],
			lastName: names[2]
		};
	}
	addCreditCardInfo(creditCardInfo) {
		if (!Array.isArray(creditCardInfo) || creditCardInfo.length < 3) {
			throw new Error('Missing credit card information');
		}
		let cardNumber = creditCardInfo[0];
		let securityNumber = creditCardInfo[2];
		if (typeof cardNumber != 'number' || typeof securityNumber != 'number') {
			throw new Error('Invalid credit card details');
		}
		this.creditCard = {
			cardNumber,
			expirationDate: creditCardInfo[1],
			securityNumber
		};
		return this;
	}
	addDestinationToWishList(destination) {
		if (this.wishList.includes(destination)) {
			throw new Error('Destination already exists in wishlist');
		}
		this.wishList.push(destination);
		this.wishList.sort((d1, d2) => d1.length - d2.length);
		return this;
	}
	generateIDNumber() {
		let id = 231 * this.fullName.firstName.charCodeAt(0);
		id += 139 * this.fullName.middleName.length;
		let surname = this.fullName.lastName;
		let surnameEndLetter = surname[surname.length - 1];
		if (/[aeiou]/i.test(surnameEndLetter))
			this.idNumber = `${id}8`;
		else this.idNumber = `${id}7`;
		return this;
	}
	getVacationerInfo() {
		let info = `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n`;
		info += `ID Number: ${this.idNumber}\n`;
		info += 'Wishlist:\n';
		if (this.wishList.length === 0) info += 'empty\n';
		else info += `${this.wishList.join(', ')}\n`;
		info += 'Credit Card:\n';
		info += `Card Number: ${this.creditCard.cardNumber}\n`;
		info += `Expiration Date: ${this.creditCard.expirationDate}\n`;
		info += `Security Number: ${this.creditCard.securityNumber}\n`;
		return info;
	}
}

//let vacationer = new Vacationer({ firstName: 'John', midleName: 'J', lastName: 'Doe'});
//let vacationer = new Vacationer(['John', 'Doe']);
//let vacationer = new Vacationer(['John', 'James', 'Doe', 'Jr.']);
//let vacationer = new Vacationer(['John', 'Jame5', 'Doe']);
let vacationer = new Vacationer(['Tania', 'Ivanova', 'Zhivkova'], [123456789, '10/01/2018', 777])
	.addCreditCardInfo([123456789, '20/10/2018', 789])
	.addDestinationToWishList('Great Britain')
	.addDestinationToWishList('London')
	.addDestinationToWishList('Veliko Tarnovo');
console.log(vacationer.getVacationerInfo());
