const axios = require('axios');

function logAllEvents() {
  return axios
    .get('http://localhost:3000/events')
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

function logOneEvent(id) {
  return axios
    .get(`http://localhost:3000/events/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

function logEventsPaginated(pageIndex, numEventsPerPage) {
  return axios
    .get('http://localhost:3000/events', {
      params: {
        _limit: numEventsPerPage,
        _page: pageIndex,
      },
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

function createEvent(event) {
  return axios.post('http://localhost:3000/events', event);
}

function updateEvent(id, event) {
  return axios.put(`http://localhost:3000/events/${id}`, event);
}

function deleteEvent(id) {
  return axios.delete(`http://localhost:3000/events/${id}`);
}

module.exports = {
  logAllEvents,
  logOneEvent,
  logEventsPaginated,
  createEvent,
  updateEvent,
  deleteEvent,
};
