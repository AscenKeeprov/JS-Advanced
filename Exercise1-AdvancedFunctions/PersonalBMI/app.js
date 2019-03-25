function evaluatePatientCondition(patientName, patientAge, patientWeightInKg, patientHeightInCm) {
	let patient = {
		name: patientName,
		personalInfo: {
			age: Number(patientAge),
			weight: Number(patientWeightInKg),
			height: Number(patientHeightInCm)
		},
		BMI: 0,
		status: undefined
	};
	let patientHeightInM = patientHeightInCm / 100;
	let bodyMassIndex = patientWeightInKg / Math.pow(patientHeightInM, 2);
	patient.BMI = Math.round(bodyMassIndex);
	if (bodyMassIndex < 18.5) patient.status = 'underweight';
	if (bodyMassIndex >= 18.5 && bodyMassIndex < 25) patient.status = 'normal';
	if (bodyMassIndex >= 25 && bodyMassIndex < 30) patient.status = 'overweight';
	if (bodyMassIndex >= 30) patient.status = 'obese';
	if (patient.status === 'obese') patient.recommendation = 'admission required';
	return patient;
}

evaluatePatientCondition("Boney", 17, 55, 178);
evaluatePatientCondition("Peter", 29, 75, 182);
evaluatePatientCondition("Chicho", 41, 83, 171);
evaluatePatientCondition("Shisho", 53, 89, 165);
