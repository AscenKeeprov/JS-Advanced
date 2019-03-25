function prepareWorker(worker) {
	if (worker.handsShaking) {
		let requiredAlcoholInMl = 0.1 * worker.weight * worker.experience;
		worker.bloodAlcoholLevel += requiredAlcoholInMl;
		worker.handsShaking = false;
	}
	return worker;
}

prepareWorker({
	weight: 80,
	experience: 1,
	bloodAlcoholLevel: 0,
	handsShaking: true
});
prepareWorker({
	weight: 120,
	experience: 20,
	bloodAlcoholLevel: 200,
	handsShaking: true
});
prepareWorker({
	weight: 95,
	experience: 3,
	bloodAlcoholLevel: 0,
	handsShaking: false
});
