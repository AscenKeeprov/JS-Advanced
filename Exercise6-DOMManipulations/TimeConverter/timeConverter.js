function attachEventsListeners() {
	let conversionTable = {
		days: { hours: 24, minutes: 1440, seconds: 86400 },
		hours: { days: 1 / 24, minutes: 60, seconds: 3600 },
		minutes: { days: 1 / 1440, hours: 1 / 60, seconds: 60 },
		seconds: { days: 1 / 86400, hours: 1 / 3600, minutes: 1 /60 }
	};
	let conversionButtons = $('input[type="button"][value="Convert"]');
	conversionButtons.click((event) => {
		let unitFrom = event.currentTarget.id.replace('Btn', '');
		let valueFrom = Number($(`#${unitFrom}`).val());
		if (valueFrom > 0) {
			let conversionRates = Object.entries(conversionTable[unitFrom]);
			for (let entry of conversionRates) {
				let unitTo = entry[0];
				let multiplier = entry[1];
				$(`#${unitTo}`).val(valueFrom * multiplier);
			}
		}
	});
}