const assert = require('chai').assert;
const Warehouse = require('./warehouse').Warehouse;

describe('Warehouse', () => {
	const InvalidWarehouseSpaceErrorMessage = 'Invalid given warehouse space';
	const InsufficientWarehouseSpaceErrorMessage = 'There is not enough space or the warehouse is already full';

	it('should throw an error if no capacity specified in constructor', () => {
		assert.throws(() => new Warehouse(), InvalidWarehouseSpaceErrorMessage);
	});

	it('should throw an error if capacity is not a number', () => {
		assert.throws(() => new Warehouse('1337'), InvalidWarehouseSpaceErrorMessage);
	});

	it('should throw an error if capacity is negative', () => {
		assert.throws(() => new Warehouse(-1), InvalidWarehouseSpaceErrorMessage);
	});

	it('should throw an error if capacity is zero', () => {
		assert.throws(() => new Warehouse(0), InvalidWarehouseSpaceErrorMessage);
	});

	it('should have correct capacity value if valid capacity passed to constructor', () => {
		let capacity = 1337;
		let warehouse = new Warehouse(capacity);
		assert.equal(warehouse.capacity, capacity);
	});

	it('should have correct capacity when updated through setter with a valid value', () => {
		let capacity = 1337;
		let newCapacity = capacity + 5994;
		let warehouse = new Warehouse(capacity);
		warehouse.capacity = newCapacity;
		assert.equal(warehouse.capacity, newCapacity);
	});

	it('should have correct capacity type if valid capacity passed to constructor', () => {
		let capacity = 1337;
		let warehouse = new Warehouse(capacity);
		assert.typeOf(warehouse.capacity, 'number');
	});

	it('should have an object property for available products by default', () => {
		let warehouse = new Warehouse(100);
		assert.typeOf(warehouse.availableProducts, 'object');
	});

	it('should have two default types of available products', () => {
		let warehouse = new Warehouse(100);
		let productTypes = Object.entries(warehouse.availableProducts);
		assert.equal(productTypes.length, 2);
	});

	it('should store available products as objects by default', () => {
		let warehouse = new Warehouse(100);
		let productTypes = Object.values(warehouse.availableProducts);
		productTypes.forEach(pt => assert.isObject(pt, 'object'));
	});

	it(`should include 'Food' and 'Drink' as default types of available products`, () => {
		let warehouse = new Warehouse(100);
		let productTypes = Object.keys(warehouse.availableProducts);
		assert.include(productTypes, 'Food');
		assert.include(productTypes, 'Drink');
	});

	it('should return a number when queried for occupied capacity', () => {
		let warehouse = new Warehouse(100);
		let occupiedCapacity = warehouse.occupiedCapacity();
		assert.isNumber(occupiedCapacity);
	});

	it('should return zero as occupied capacity if no products available', () => {
		let warehouse = new Warehouse(100);
		let occupiedCapacity = warehouse.occupiedCapacity();
		assert.equal(occupiedCapacity, 0);
	});

	it('should return correct total quantity of available products as occupied capacity when not empty', () => {
		let warehouse = new Warehouse(1);
		let expectedOccupiedCapacity = 11;
		let sandwichesQuantity = expectedOccupiedCapacity - 4;
		let teaQuantity = expectedOccupiedCapacity - sandwichesQuantity;
		warehouse.availableProducts['Food']['Sandwich'] = sandwichesQuantity;
		warehouse.availableProducts['Drink']['Tea'] = teaQuantity;
		let occupiedCapacity = warehouse.occupiedCapacity();
		assert.equal(occupiedCapacity, expectedOccupiedCapacity);
	});

	it('should throw an error when quantity of added products exceeds total capacity', () => {
		let warehouse = new Warehouse(1);
		assert.throws(() => warehouse.addProduct('Food', 'Sandwich', warehouse.capacity + 1),
			InsufficientWarehouseSpaceErrorMessage);
	});

	it('should throw an error when quantity of added products exceeds free capacity', () => {
		let warehouse = new Warehouse(100);
		warehouse.availableProducts['Food']['Sandwich'] = warehouse.capacity - 25;
		let freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		assert.throws(() => warehouse.addProduct('Drink', 'Tea', freeCapacity + 1),
			InsufficientWarehouseSpaceErrorMessage);
	});

	it('should not change occupied capacity when adding zero quantity of a product', () => {
		let warehouse = new Warehouse(100);
		let occupiedCapacityBefore = warehouse.occupiedCapacity();
		warehouse.addProduct('Drink', 'Tea', 0);
		let occupiedCapacityAfter = warehouse.occupiedCapacity();
		assert.equal(occupiedCapacityAfter, occupiedCapacityBefore);
	});

	it('should throw an error if adding products outside of the allowed categories', () => {
		let warehouse = new Warehouse(100);
		assert.throws(() => warehouse.addProduct('Medicine', 'Aspirin', 10));
	});

	it('should throw an error when trying to add a product without specifying any details', () => {
		let warehouse = new Warehouse(100);
		assert.throws(() => warehouse.addProduct(), InsufficientWarehouseSpaceErrorMessage);
	});

	it('should throw an error when trying to add a product without specifying name and quantity', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		assert.throws(() => warehouse.addProduct(typeOfProduct), InsufficientWarehouseSpaceErrorMessage);
	});

	it('should throw an error when trying to add a product without specifying quantity', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		assert.throws(() => warehouse.addProduct(typeOfProduct, 'Product'),
			InsufficientWarehouseSpaceErrorMessage);
	});

	it('should throw an error when trying to add a product with invalid quantity', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		assert.throws(() => warehouse.addProduct(typeOfProduct, 'Product', '12'));
	});

	it('should return an available product type as an object when adding a product of that type', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		let quantityOfProductAdded = warehouse.capacity - warehouse.occupiedCapacity();
		let result = warehouse.addProduct(typeOfProduct, 'Bananas', quantityOfProductAdded);
		assert.isObject(result);
		let expectedResult = warehouse.availableProducts[typeOfProduct];
		assert.equal(result, expectedResult);
	});

	it('should store correct quantity of product when there is available space and new product added once', () => {
		let warehouse = new Warehouse(100);
		let freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		let nameOfProduct = 'Product';
		let quantityOfProductAdded = Math.floor(freeCapacity / 2);
		warehouse.addProduct(typeOfProduct, nameOfProduct, quantityOfProductAdded);
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, quantityOfProductAdded);
	});

	it('should store correct quantity of product when there is available space and new product added several times', () => {
		let warehouse = new Warehouse(100);
		let freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		let nameOfProduct = 'Product';
		let expectedQuantityOfProduct = 0;
		let timesToAdd = 3;
		for (let i = 1; i <= timesToAdd; i++) {
			let quantityOfProductAdded = Math.floor(freeCapacity / (timesToAdd + 1));
			warehouse.addProduct(typeOfProduct, nameOfProduct, quantityOfProductAdded);
			expectedQuantityOfProduct += quantityOfProductAdded;
		}
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, expectedQuantityOfProduct);
	});

	it('should update quantity of product correctly when there is available space and old product added once', () => {
		let warehouse = new Warehouse(100);
		let freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		let nameOfProduct = 'Product';
		let initialQuantityOfProduct = Math.floor(freeCapacity / 3);
		warehouse.availableProducts[typeOfProduct][nameOfProduct] = initialQuantityOfProduct;
		freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		let quantityOfProductAdded = Math.floor(freeCapacity / 2);
		let expectedQuantityOfProduct = initialQuantityOfProduct + quantityOfProductAdded;
		warehouse.addProduct(typeOfProduct, nameOfProduct, quantityOfProductAdded);
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, expectedQuantityOfProduct);
	});

	it('should update quantity of product correctly when there is available space and old product added several times', () => {
		let warehouse = new Warehouse(100);
		let freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
		let typeOfProduct = Object.keys(warehouse.availableProducts)[0];
		let nameOfProduct = 'Product';
		let initialQuantityOfProduct = Math.floor(freeCapacity / 4);
		warehouse.availableProducts[typeOfProduct][nameOfProduct] = initialQuantityOfProduct;
		let expectedQuantityOfProduct = initialQuantityOfProduct;
		let timesToAdd = 3;
		for (let i = 1; i <= timesToAdd; i++) {
			freeCapacity = warehouse.capacity - warehouse.occupiedCapacity();
			let quantityOfProductAdded = Math.floor(freeCapacity / 2);
			warehouse.addProduct(typeOfProduct, nameOfProduct, quantityOfProductAdded);
			expectedQuantityOfProduct += quantityOfProductAdded;
		}
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, expectedQuantityOfProduct);
	});

	it('should sort products in descending order by quantity and return result as an object when valid type is passed', () => {
		let warehouse = new Warehouse(100);
		let productType = 'Food';
		warehouse.availableProducts = {
			[productType]: {
				'Apples': 11,
				'Strawberries': 20,
				'Cherries': 8,
				'Lettuce': 15.4
			},
			'Drink': {}
		};
		let expectedResult = {
			'Strawberries': 20,
			'Lettuce': 15.4,
			'Apples': 11,
			'Cherries': 8
		};
		let actualResult = warehouse.orderProducts(productType);
		assert.deepEqual(actualResult, expectedResult);
	});

	it('should throw an error when trying to sort products without specifying product type', () => {
		let warehouse = new Warehouse(100);
		assert.throws(() => warehouse.orderProducts());
	});

	it('should throw an error when trying to sort products of invalid type', () => {
		let warehouse = new Warehouse(100);
		assert.throws(() => warehouse.orderProducts('Tools'));
	});

	it('should return a list of available products as a result of revision when not empty', () => {
		let warehouse = new Warehouse(1000);
		warehouse.availableProducts = {
			'Drink': { 'Water': 79 },
			'Food': { 'Bread': 58, 'Cheese': 8 }
		};
		let expectedResult = 'Product type - [Drink]\n- Water 79\n' +
			'Product type - [Food]\n- Bread 58\n- Cheese 8';
		let actualResult = warehouse.revision();
		assert.strictEqual(actualResult, expectedResult);
	});

	it('should return information message if trying to do a revision while empty', () => {
		let warehouse = new Warehouse(100);
		let expectedResult = 'The warehouse is empty'
		let actualResult = warehouse.revision();
		assert.strictEqual(actualResult, expectedResult);
	});

	it('should throw an error if trying to scrap a product which is not in stock', () => {
		let warehouse = new Warehouse(100);
		let productName = 'Non-existent product';
		let expectedErrorMessage = `${productName} do not exists`;
		assert.throws(() => warehouse.scrapeAProduct(productName, 10), expectedErrorMessage);
	});

	it('should scrap correct amount of given product when quantity to scrap is less than available quantity', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = 'Vehicles';
		let nameOfProduct = 'Cars';
		let initialQuantityOfProduct = 29;
		warehouse.availableProducts = { [typeOfProduct]: { [nameOfProduct]: initialQuantityOfProduct } };
		let quantityOfProductToScrap = Math.floor(initialQuantityOfProduct / 2);
		let expectedQuantityOfProduct = initialQuantityOfProduct - quantityOfProductToScrap;
		warehouse.scrapeAProduct(nameOfProduct, quantityOfProductToScrap);
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, expectedQuantityOfProduct);
	});

	it('should set stored quantity of given product to zero when quantity to scrap is more than available quantity', () => {
		let warehouse = new Warehouse(100);
		let typeOfProduct = 'Vehicles';
		let nameOfProduct = 'Cars';
		let initialQuantityOfProduct = 29;
		warehouse.availableProducts = { [typeOfProduct]: { [nameOfProduct]: initialQuantityOfProduct } };
		let quantityOfProductToScrap = Math.floor(initialQuantityOfProduct * 2);
		warehouse.scrapeAProduct(nameOfProduct, quantityOfProductToScrap);
		let actualQuantityOfProduct = warehouse.availableProducts[typeOfProduct][nameOfProduct];
		assert.equal(actualQuantityOfProduct, 0);
	});
});
