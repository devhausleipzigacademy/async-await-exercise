const axios = require('axios');

async function logAllEvents() {
  try {
    const res = await axios.get('http://localhost:3000/events');
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

async function logOneEvent(id) {
  try {
    const res = await axios.get(`http://localhost:3000/events/${id}`);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

async function logEventsPaginated(pageIndex, numEventsPerPage) {
  try {
    const res = await axios.get('http://localhost:3000/events', {
      params: {
        _limit: numEventsPerPage,
        _page: pageIndex,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
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
