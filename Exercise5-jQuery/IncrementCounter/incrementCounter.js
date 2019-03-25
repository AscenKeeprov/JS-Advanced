function increment(counterParentSelector) {
	function createCounterElements() {
		let counter = $('<textarea>');
		counter.addClass('counter');
		counter.attr('disabled', 'disabled');
		counter.val(0);
		let counterValues = $('<ul>');
		counterValues.addClass('results');
		let incrementButton = $('<button>');
		incrementButton.addClass('btn');
		incrementButton.attr('id', 'incrementBtn');
		incrementButton.text('Increment');
		incrementButton.click(() => {
			counter.val(Number(counter.val()) + 1);
		});
		let addButton = $('<button>');
		addButton.addClass('btn');
		addButton.attr('id', 'addBtn');
		addButton.text('Add');
		addButton.click(() => {
			let currentCounterValue = $('<li>');
			currentCounterValue.text(counter.val());
			counterValues.append(currentCounterValue);
		});
		return [counter, incrementButton, addButton, counterValues];
	}
	let counterParent = $(counterParentSelector);
	let counterChildren = createCounterElements();
	counterParent.append(counterChildren);
}