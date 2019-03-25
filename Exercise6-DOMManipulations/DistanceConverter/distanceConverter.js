function attachEventsListeners() {
	let convertToMetreRates = {
		cm: 0.01,
		ft: 0.3048,
		in: 0.0254,
		km: 1000,
		m: 1,
		mi: 1609.34,
		mm: 0.001,
		yrd: 0.9144
	};
	let convertButton = $('#convert');
	convertButton.click(() => {
		let distanceFrom = Number($('#inputDistance').val());
		if (distanceFrom > 0) {
			let unitFrom = $('#inputUnits').val();
			let unitTo = $('#outputUnits').val();
			let distanceInMetres = distanceFrom * convertToMetreRates[unitFrom];
			let distanceTo = distanceInMetres / convertToMetreRates[unitTo];
			$('#outputDistance').val(distanceTo);
		}
	});
}