function addDestination() {
	let cityInput = $('.inputData')[0];
	let countryInput = $('.inputData')[1];
	if (cityInput.value && countryInput.value) {
		let season = $('#seasons option:selected').text();
		let destinationRow = $('<tr>');
		let destinationCell = $(`<td>${cityInput.value}, ${countryInput.value}</td>`);
		destinationCell.appendTo(destinationRow);
		let seasonCell = $(`<td>${season}</td>`);
		seasonCell.appendTo(destinationRow);
		destinationRow.appendTo($('#destinationsList'));
		let seasonCounter = $(`#${season.toLowerCase()}`);
		seasonCounter.val(Number(seasonCounter.val()) + 1);
		cityInput.value = '';
		countryInput.value = '';
	}
}