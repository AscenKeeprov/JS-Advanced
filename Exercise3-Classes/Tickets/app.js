let solution = (function () {
	class Ticket {
		constructor(destination, price, status) {
			this.destination = destination;
			this.price = price;
			this.status = status;
		}
	};
	return function (ticketsData, sortCriterion) {
		let tickets = [];
		for (let entry of ticketsData) {
			let ticketData = entry.split('|');
			let destination = ticketData[0];
			let price = parseFloat(ticketData[1]);
			let status = ticketData[2];
			let ticket = new Ticket(destination, price, status);
			tickets.push(ticket);
		}
		tickets.sort((t1, t2) => {
			if (typeof t1[sortCriterion] === 'string')
				return t1[sortCriterion].localeCompare(t2[sortCriterion]);
			if (typeof t1[sortCriterion] === 'number')
				return t1[sortCriterion] - t2[sortCriterion];
		});
		return tickets;
	}
})();

solution(
	[
		'Philadelphia|94.20|sold',
		'Seattle|95.99|available',
		'Boston|126.20|departed',
		'New York City|95.99|available',
		'Philadelphia|94.20|departed'
	],
	'destination'
);
