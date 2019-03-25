function makeReservation(paymentDetailsElementSelector) {
	let fullNameInput = $('#fullName');
	let emailInput = $('#email');
	let phoneNumberInput = $('#phoneNumber');
	let addressInput = $('#address');
	let postalCodeInput = $('#postalCode');
	let infoPreviewList = $('#infoPreview');
	let submitButton = $('#submit');
	let editButton = $('#edit');
	let continueButton = $('#continue');
	let paymentDetailsElement = $(paymentDetailsElementSelector);
	submitButton.click(() => {
		if (fullNameInput.val() && emailInput.val()) {
			let fullNamePreviewItem = $('<li>');
			fullNamePreviewItem.attr('id', 'fullNamePreview');
			fullNamePreviewItem.text(`Name: ${fullNameInput.val()}`);
			infoPreviewList.append(fullNamePreviewItem);
			fullNameInput.val('');
			let emailPreviewItem = $('<li>');
			emailPreviewItem.attr('id', 'emailPreview');
			emailPreviewItem.text(`E-mail: ${emailInput.val()}`);
			infoPreviewList.append(emailPreviewItem);
			emailInput.val('');
			let phoneNumberPreviewItem = $('<li>');
			phoneNumberPreviewItem.attr('id', 'phoneNumberPreview');
			phoneNumberPreviewItem.text(`Phone: ${phoneNumberInput.val()}`);
			infoPreviewList.append(phoneNumberPreviewItem);
			phoneNumberInput.val('');
			let addressPreviewItem = $('<li>');
			addressPreviewItem.attr('id', 'addressPreview');
			addressPreviewItem.text(`Address: ${addressInput.val()}`);
			infoPreviewList.append(addressPreviewItem);
			addressInput.val('');
			let postalCodePreviewItem = $('<li>');
			postalCodePreviewItem.attr('id', 'postalCodePreview');
			postalCodePreviewItem.text(`Postal Code: ${postalCodeInput.val()}`);
			infoPreviewList.append(postalCodePreviewItem);
			postalCodeInput.val('');
			submitButton.attr('disabled', 'disabled');
			continueButton.removeAttr('disabled');
			editButton.removeAttr('disabled');
		}
	});
	editButton.click(() => {
		fullNameInput.val($('#fullNamePreview').text().split(': ')[1]);
		emailInput.val($('#emailPreview').text().split(': ')[1]);
		phoneNumberInput.val($('#phoneNumberPreview').text().split(': ')[1]);
		addressInput.val($('#addressPreview').text().split(': ')[1]);
		postalCodeInput.val($('#postalCodePreview').text().split(': ')[1]);
		infoPreviewList.html('');
		continueButton.attr('disabled', 'disabled');
		editButton.attr('disabled', 'disabled');
		submitButton.removeAttr('disabled');
	});
	continueButton.click(() => {
		continueButton.attr('disabled', 'disabled');
		editButton.attr('disabled', 'disabled');
		submitButton.attr('disabled', 'disabled');
		let paymentDetailsHeading = $('<h2>');
		paymentDetailsHeading.text('Payment details');
		paymentDetailsElement.append(paymentDetailsHeading);
		let paymentOptionsDropdown = $('<select>');
		paymentOptionsDropdown.attr('id', 'paymentOptions');
		paymentOptionsDropdown.addClass('custom-select');
		let chooseOption = $('<option>');
		chooseOption.attr('disabled', 'disabled');
		chooseOption.attr('hidden', 'hidden');
		chooseOption.attr('selected', 'selected');
		chooseOption.text('Choose');
		chooseOption.appendTo(paymentOptionsDropdown);
		let cardOption = $('<option>');
		cardOption.text('Credit Card');
		cardOption.val('creditCard');
		cardOption.appendTo(paymentOptionsDropdown);
		let bankOption = $('<option>');
		bankOption.text('Bank Transfer');
		bankOption.val('bankTransfer');
		bankOption.appendTo(paymentOptionsDropdown);
		let extraDetailsElement = $('<div>');
		paymentOptionsDropdown.change(generateExtraDetails);
		paymentDetailsElement.append(paymentOptionsDropdown);
		extraDetailsElement.attr('id', 'extraDetails');
		paymentDetailsElement.append(extraDetailsElement);
	});
	function generateExtraDetails() {
		let selectedPaymentOption = $('#paymentOptions').val();
		let extraDetailsElement = $('#extraDetails');
		extraDetailsElement.html('');
		if (selectedPaymentOption === 'creditCard') {
			for (let div = 1; div <= 3; div++) {
				let division = $('<div>');
				division.addClass('inputLabel');
				if (div === 1) division.text('Card Number');
				if (div === 2) division.text('Expiration Date');
				if (div === 3) division.text('Security Numbers');
				division.append($('<input>'));
				extraDetailsElement.append(division);
				extraDetailsElement.append($('<br>'));
			}
		} else if (selectedPaymentOption === 'bankTransfer') {
			let paragraph = $('<p>');
			let transferDetails = 'You have 48 hours to transfer the amount to:';
			transferDetails += '<br>';
			transferDetails += 'IBAN: GR96 0810 0010 0000 0123 4567 890';
			paragraph.html(transferDetails);
			extraDetailsElement.append(paragraph);
		}
		let checkoutButton = $('<button>');
		checkoutButton.attr('id', 'checkOut');
		checkoutButton.text('Check Out');
		checkoutButton.click(() => {
			let heading4 = $('<h4>');
			heading4.text('Thank you for your reservation!');
			$('#wrapper').html(heading4);
		});
		extraDetailsElement.append(checkoutButton);
	}
}