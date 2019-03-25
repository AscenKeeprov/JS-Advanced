function solve() {
	let coursePrices = {
		'JS-Fundamentals': 170,
		'JS-Advanced': 180,
		'JS-Applications': 190,
		'JS-Web': 490
	};
	let coursesList = $('#myCourses ul');
	let signUpButton = $('.courseFoot > button');
	signUpButton.click(() => {
		let checkedCourses = $('input[type="checkbox"]:checked');
		let educationForm = $('input[name="educationForm"]:checked').val();
		let totalCost = 0.00;
		for (let course of checkedCourses) {
			let courseName = course.value.slice(0, 4).toUpperCase() + course.value.slice(4);
			let courseListItem = $('<li>');
			courseListItem.text(courseName);
			courseListItem.appendTo(coursesList);
			totalCost += coursePrices[courseName];
		}
		if (coursesList.text().includes('JS-Advanced')
			&& coursesList.text().includes('JS-Fundamentals')) {
			totalCost -= coursePrices['JS-Advanced'] * 0.1;
			if (coursesList.text().includes('JS-Applications')) {
				moduleDiscount = 540 * 0.06;
				totalCost -= moduleDiscount;
				if (coursesList.text().includes('JS-Web')) {
					let bonusCourseListItem = $('<li>');
					bonusCourseListItem.text('HTML and CSS');
					bonusCourseListItem.appendTo(coursesList);
				}
			}
		}
		if (educationForm.toUpperCase() === 'ONLINE') totalCost *= 0.94
		$('.courseFoot > p').text(`Cost: ${Math.trunc(totalCost)}.00 BGN`);
	});
}

solve();