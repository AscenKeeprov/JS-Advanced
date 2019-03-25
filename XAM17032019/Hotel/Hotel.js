class Hotel {
	constructor(name, capacity) {
		this.name = name;
		this.capacity = capacity;
		this.rooms = {
			single: Math.floor(this.capacity * 0.5),
			double: Math.floor(this.capacity * 0.3),
			maisonette: Math.floor(this.capacity * 0.2)
		}
		this.bookings = [];
		this.currentBookingNumber = 1;
		return this;
	}
	get roomsPricing() {
		return {
			single: 50,
			double: 90,
			maisonette: 135
		}
	}
	get servicesPricing() {
		return {
			food: 10,
			drink: 15,
			housekeeping: 25
		}
	}
	checkOut(roomNumber) {
		let booking = this.bookings.filter(b => b.roomNumber === roomNumber)[0];
		if (booking === undefined) return `The booking ${roomNumber} is invalid.`;
		let lodgingCost = booking.nights * this.roomsPricing[booking.roomType];
		let servicesCost = 0;
		if (booking.hasOwnProperty('services')) {
			servicesCost = booking.services.map(s => this.servicesPricing[s]).reduce((s1, s2) => s1 + s2);
			console.log(servicesCost);
		}
		let message = `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${lodgingCost + servicesCost} BGN.`;
		if (servicesCost > 0) {
			message += ` You have used additional room services, costing ${servicesCost} BGN.`
		}
		this.bookings = this.bookings.filter(b => b !== booking);
		this.rooms[booking.roomType]++;
		return message;
	}
	rentARoom(clientName, roomType, nights) {
		roomType = roomType.toLowerCase();
		let totalCapacityOfRoomType = this.rooms[roomType];
		let takenCapacityOfRoomType = this.bookings.filter(b => b.roomType === roomType).length;
		if (takenCapacityOfRoomType < totalCapacityOfRoomType) {
			let booking = { clientName, roomType, nights, roomNumber: this.currentBookingNumber }
			this.bookings.push(booking);
			this.rooms[roomType]--;
			return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`
		} else {
			let message = `No ${roomType} rooms available!`;
			let otherRooms = Object.entries(this.rooms).filter(kvp => kvp[0] != roomType);
			for (let room of otherRooms) message += ` Available ${room[0]} rooms: ${room[1]}.`;
			return message;
		}
	}
	report() {
		let report = `${this.name.toUpperCase()} DATABASE:\n`;
		report += '--------------------\n';
		if (this.bookings.length === 0) {
			report += 'There are currently no bookings.';
			return report;
		}
		for (let booking of this.bookings) {
			report += `bookingNumber - ${booking.roomNumber}\n`;
			report += `clientName - ${booking.clientName}\n`;
			report += `roomType - ${booking.roomType}\n`;
			report += `nights - ${booking.nights}\n`;
			if (booking.hasOwnProperty('services'))
				report += `services: ${booking.services.join(', ')}`;
			else report += '----------\n';
			
		}
		return report;
	}
	roomService(roomNumber, serviceType) {
		let booking = this.bookings.filter(b => b.roomNumber === roomNumber)[0];
		if (booking === undefined) return `The booking ${roomNumber} is invalid.`;
		let servicePrice = this.servicesPricing[serviceType];
		if (servicePrice === undefined) return `We do not offer ${serviceType} service.`
		if (!booking.hasOwnProperty('services')) booking.services = [];
		booking.services.push(serviceType);
		return `Mr./Mrs. ${booking.clientName}, Your order for ${serviceType} service has been successful.`;
	}
}

let hotel = new Hotel('HotUni', 10);
console.log(hotel.rentARoom('Peter', 'single', 4));
console.log(hotel.checkOut(1));
console.log(hotel.rentARoom('Robert', 'double', 4));
console.log(hotel.rentARoom('Geroge', 'maisonette', 6));
console.log(hotel.roomService(3, 'housekeeping'));
console.log(hotel.roomService(3, 'drink'));
console.log(hotel.roomService(2, 'room'));
console.log(hotel.report());
