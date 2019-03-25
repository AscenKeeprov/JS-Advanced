class CheckingAccount {
	constructor(clientId, email, firstName, lastName) {
		this.clientId = clientId;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.products = [];
	}
	get clientId() {
		return this._clientId;
	}
	set clientId(id) {
		if (/^\d{6}$/g.test(id) === false)
			throw new TypeError('Client ID must be a 6-digit number');
		this._clientId = Number(id);
	}
	get email() {
		return this._email;
	}
	set email(address) {
		const validEmailRegExp = /^[a-z0-9]+@[a-z]+(?:\.[a-z]+)+$/gi;
		if (validEmailRegExp.test(address) === false)
			throw new TypeError('Invalid e-mail');
		this._email = address;
	}
	get firstName() {
		return this._firstName;
	}
	set firstName(name) {
		this._firstName = this.validateName(name, 'First');
	}
	get lastName() {
		return this._lastName;
	}
	set lastName(name) {
		this._lastName = this.validateName(name, 'Last');
	}
	validateName(name, nameType) {
		const nameMinLength = 3;
		const nameMaxLength = 20;
		if (!name || name.length < nameMinLength || name.length > nameMaxLength)
			throw new TypeError(`${nameType} name must be between ${nameMinLength} and ${nameMaxLength} characters long`);
		if (/[^a-z]/gi.test(name) === true)
			throw new TypeError(`${nameType} name must contain only Latin characters`);
		return name;
	}
}

let account = new CheckingAccount('123456', 'jdoe@some.com', 'John', 'Doe');
account = new CheckingAccount('12345', 'jdoe@some.com', 'John', 'Doe');
account = new CheckingAccount('1234567', 'jdoe@some.com', 'John', 'Doe');
account = new CheckingAccount('1234S6', 'jdoe@some.com', 'John', 'Doe');
account = new CheckingAccount(123456, 'jdoe@com', 'John', 'Doe');
account = new CheckingAccount('234567', 'jdoe@some.com', 'J', 'Doe');
account = new CheckingAccount(234567, 'jdoe@some.com', 'John', 'D0e')
