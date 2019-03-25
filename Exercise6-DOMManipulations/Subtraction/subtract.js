function subtract() {
	let firstNumber = Number($('#firstNumber').val());
	let secondNumber = Number($('#secondNumber').val());
	$('#result').text(firstNumber - secondNumber);
}