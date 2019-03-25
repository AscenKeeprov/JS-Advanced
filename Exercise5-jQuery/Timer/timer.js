function timer() {
	let secondsTimer = $('#seconds');
	let minutesTimer = $('#minutes');
	let hoursTimer = $('#hours');
	function displayTime(seconds, minutes, hours) {
		secondsTimer.text(seconds < 10 ? `0${seconds}` : seconds);
		minutesTimer.text(minutes < 10 ? `0${minutes}` : minutes);
		hoursTimer.text(hours < 10 ? `0${hours}` : hours);
	}
	let time = 0;
	function increaseTime() {
		time++;
		let seconds = time % 60;
		let minutes = Math.trunc(time / 60) % 60;
		let hours = Math.trunc(time / 3600) % 24;
		return [seconds, minutes, hours];
	}
	let intervalId;
	$('#start-timer').click(() => {
		if (intervalId === undefined) {
			intervalId = setInterval(function () {
				[seconds, minutes, hours] = increaseTime();
				displayTime(seconds, minutes, hours);
			}, 1000);
		}
	});
	$('#stop-timer').click(() => {
		clearInterval(intervalId);
		intervalId = undefined;
	});
}