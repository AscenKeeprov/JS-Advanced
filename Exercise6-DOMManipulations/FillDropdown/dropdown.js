function addItem() {
	let optionTextInput = $('#newItemText');
	let optionValueInput = $('#newItemValue');
	let option = $('<option>');
	option.text(optionTextInput.val());
	option.val(optionValueInput.val());
	option.appendTo($('#menu'));
	optionTextInput.val('');
	optionValueInput.val('');
}