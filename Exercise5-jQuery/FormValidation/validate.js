function validate() {
	function highlightIfInvalid(element, isInvalid) {
		if (element instanceof jQuery === false) element = $(element);
		if (isInvalid) element.css('border-color', 'red');
		else element.css('border-color', '');
		if (element.prop('style').length === 0) element.removeAttr('style');
	}
	function isValidCompanyNumber(companyNumber) {
		return /^[1-9]\d{3}$/g.test(companyNumber);
	}
	function isValidEmail(email) {
		return /^([^\s@]+)?@([^\s@]+)?\.+([^\s@]+)?$/g.test(email);
	}
	function isValidPassword(password) {
		return /^\w{5,15}$/g.test(password);
	}
	function isValidUsername(username) {
		return /^[a-z0-9]{3,20}$/gi.test(username);
	}
	let usernameInput = $('#username');
	usernameInput.change((event) => {
		highlightIfInvalid(event.target, !isValidUsername(usernameInput.val()));
	})
	let emailInput = $('#email');
	emailInput.change((event) => {
		highlightIfInvalid(event.target, !isValidEmail(emailInput.val()));
	})
	let passwordInput = $('#password');
	passwordInput.change((event) => {
		let isInvalid = !isValidPassword(passwordInput.val())
			|| passwordInput.val() !== confirmPasswordInput.val();
		highlightIfInvalid(event.target, isInvalid);
	});
	let confirmPasswordInput = $('#confirm-password');
	confirmPasswordInput.change((event) => {
		let isInvalid = !isValidPassword(confirmPasswordInput.val())
			|| confirmPasswordInput.val() !== passwordInput.val();
		highlightIfInvalid(event.target, isInvalid);
	});
	let companyNumberInput = $('#companyNumber');
	let isCompanyInput = $('#company');
	isCompanyInput.change((event) => {
		let companyInfoFieldset = $('#companyInfo');
		if (event.currentTarget.checked) {
			companyInfoFieldset.css('display', 'block');
			companyNumberInput.change((event) => {
				highlightIfInvalid(event.target, !isValidCompanyNumber(companyNumberInput.val()));
			});
		} else {
			companyInfoFieldset.css('display', 'none');
			companyNumberInput.css('border-color', '');
			if (companyNumberInput.prop('style').length === 0)
				companyNumberInput.removeAttr('style');
			companyNumberInput.off('change');
		}
	});
	let validationPassedNotice = $('#valid');
	let submitButton = $('#submit');
	submitButton.click((event) => {
		event.preventDefault();
		highlightIfInvalid(usernameInput, !isValidUsername(usernameInput.val()));
		highlightIfInvalid(emailInput, !isValidEmail(emailInput.val()));
		highlightIfInvalid(passwordInput, !isValidPassword(passwordInput.val())
			|| passwordInput.val() !== confirmPasswordInput.val());
		highlightIfInvalid(confirmPasswordInput, !isValidPassword(confirmPasswordInput.val())
			|| confirmPasswordInput.val() !== passwordInput.val());
		highlightIfInvalid(companyNumberInput, isCompanyInput.prop('checked')
			&& !isValidCompanyNumber(companyNumberInput.val()));
		let invalidFields = Array.from(document.getElementsByTagName('input'))
			.filter(i => i.style.borderColor === 'red');
		if (invalidFields.length === 0) validationPassedNotice.css('display', 'block');
		else validationPassedNotice.css('display', 'none');
	});
}

/* SoftUni's idiotic solution */
//function validate() {
//	let usernameInput = $('#username');
//	let emailInput = $('#email');
//	let passwordInput = $('#password');
//	let confirmPasswordInput = $('#confirm-password');
//	let companyInfoFieldset = $('#companyInfo');
//	let companyNumberInput = $('#companyNumber');
//	let isCompanyInput = $('#company');
//	isCompanyInput.change((event) => {
//		if (event.currentTarget.checked) companyInfoFieldset.css('display', 'block');
//		else companyInfoFieldset.css('display', 'none');
//	});
//	let validationPassedNotice = $('#valid');
//	let submitButton = $('#submit');
//	submitButton.click((event) => {
//		event.preventDefault();
//		if (!/^[a-z0-9]{3,20}$/gi.test(usernameInput.val()))
//			usernameInput.css('border-color', 'red');
//		if (!/^([^\s@]+)?@([^\s@]+)?\.+([^\s@]+)?$/g.test(emailInput.val()))
//			emailInput.css('border-color', 'red');
//		if (!/^\w{5,15}$/g.test(passwordInput.val()) || passwordInput.val() !== confirmPasswordInput.val())
//			passwordInput.css('border-color', 'red');
//		if (!/^\w{5,15}$/g.test(confirmPasswordInput.val()) || confirmPasswordInput.val() !== passwordInput.val())
//			confirmPasswordInput.css('border-color', 'red');
//		if (isCompanyInput.prop('checked') && !/^[1-9]\d{3}$/g.test(companyNumberInput.val()))
//			companyNumberInput.css('border-color', 'red');
//		let invalidFields = Array.from(document.getElementsByTagName('input'))
//			.filter(i => i.style.borderColor === 'red');
//		if (invalidFields.length === 0) validationPassedNotice.css('display', 'block');
//		else validationPassedNotice.css('display', 'none');
//	});
//}