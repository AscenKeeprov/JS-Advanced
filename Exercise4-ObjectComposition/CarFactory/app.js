function assembleCar(carDescription) {
	let engines = [
		{ power: 90, volume: 1800 },
		{ power: 120, volume: 2400 },
		{ power: 200, volume: 3500 }
	];
	let wheel = carDescription.wheelsize % 2 === 0
		? carDescription.wheelsize - 1
		: carDescription.wheelsize;
	return {
		model: carDescription.model,
		engine: engines.find(e => e.power >= carDescription.power),
		carriage: {
			type: carDescription.carriage,
			color: carDescription.color
		},
		wheels: [wheel, wheel, wheel, wheel]
	}
}

assembleCar({
	model: 'VW Golf II',
	power: 90,
	color: 'blue',
	carriage: 'hatchback',
	wheelsize: 14
});
assembleCar({
	model: 'Opel Vectra',
	power: 110,
	color: 'grey',
	carriage: 'coupe',
	wheelsize: 17
});
