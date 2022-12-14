const axios = require("axios");

function logAllEvents() {
	return axios
		.get("http://localhost:3000/events")
		.then((res) => {
			console.log(res.data);
		})
		.catch((error) => {
			console.error(error);
		});
}

function logOneEvent(id) {
	//
}

function logEventsPaginated(pageIndex, numEventsPerPage) {
	//
}

function createEvent(event) {
	//
}

function updateEvent(id, event) {
	//
}

function deleteEvent(id) {
	//
}

module.exports = {
	logAllEvents,
	logOneEvent,
	logEventsPaginated,
	createEvent,
	updateEvent,
	deleteEvent
};
