function argumentInfo() {
	let argumentsCountByType = [];
	for (let argument of arguments) {
		let argumentType = typeof argument;
		console.log(`${argumentType}: ${argument}`);
		let argumentInfo = argumentsCountByType.find(a => a.type === argumentType);
		if (!argumentInfo) argumentsCountByType.push({ type: argumentType, count: 1 });
		else argumentInfo.count++;
	}
	argumentsCountByType.sort((a1, a2) => a2.count - a1.count);
	for (let argumentInfo of argumentsCountByType) {
		console.log(`${argumentInfo.type} = ${argumentInfo.count}`);
	}
}

argumentInfo('cat', 42, 'dog', -3, function () { console.log('Hello world!'); }, 'bee',  53);
argumentInfo('cat', 42, function () { console.log('Hello world!'); });
argumentInfo(1, 'two');
