const axios = require('axios');
const EventService = require('./axios-exercise.js');

const jsonServer = axios.create({
  baseURL: 'http://localhost:3000',
});

beforeAll(() => {
  console.log = jest.fn();
});

beforeEach(() => {
  console.log.mockReset();
});

describe('JSON Server Connection', () => {
  test('json server should be running during tests. Start it in a seperate terminal with yarn serve:db', async () => {
    await expect(jsonServer.get()).resolves.toBeTruthy();
  });
});

describe('logAllEvents', () => {
  test('is should log an array and contain at least 10 events', async () => {
    await EventService.logAllEvents();
    expect(console.log.mock.calls[0][0]).toBeInstanceOf(Array);
    expect(console.log.mock.calls[0][0].length).toBeGreaterThan(10);
    const event = console.log.mock.calls[0][0][0];
    expect(event.id).toBeTruthy();
  });
});

describe('logOneEvent', () => {
  test('is should log a single event with matching id', async () => {
    const { data: events } = await jsonServer.get('/events');

    const testEvent = events[events.length - 1];
    await EventService.logOneEvent(testEvent.id);
    expect(console.log.mock.calls[0][0]).toEqual(testEvent);
  });
});

describe('logEventsPaginated', () => {
  test('is should log entries from page 2', async () => {
    const { data: events } = await jsonServer.get('/events');

    expect(events.length).toBeGreaterThanOrEqual(6);
    await EventService.logEventsPaginated(2, 3);

    expect(console.log.mock.calls[0][0]).toEqual(events.slice(3, 6));
  });
});

describe('createEvent', () => {
  test('is should create a new event', async () => {
    const testId = 12891058;
    const testEvent = {
      id: testId,
      title: 'Test Event Title',
      details: 'Event Details',
      date: '06/28/2020 12:46',
      location: 'Event Location',
    };

    await EventService.createEvent(testEvent);

    const { data: event } = await jsonServer.get(`/events/${testId}`);

    expect(event).toEqual(testEvent);

    // Undo
    await jsonServer.delete(`/events/${testId}`);
  });
});

describe('updateEvent', () => {
  test('is should update an event with the given id', async () => {
    const { data: events } = await jsonServer.get('/events');

    expect(events.length).toBeGreaterThanOrEqual(6);
    const originalEvent = events[4];

    const testEvent = {
      id: originalEvent.id,
      title: 'Test Event Title',
      details: 'Event Details',
      date: '06/28/2020 12:46',
      location: 'Event Location',
    };

    await EventService.updateEvent(originalEvent.id, testEvent);

    const { data: event } = await jsonServer.get(`/events/${originalEvent.id}`);

    expect(event).toEqual(testEvent);

    // Undo
    await jsonServer.put(`/events/${originalEvent.id}`, originalEvent);
  });
});

describe('deleteEvent', () => {
  test('is should delete an event with the given id', async () => {
    const { data: events } = await jsonServer.get('/events');

    expect(events.length).toBeGreaterThanOrEqual(6);
    const originalEvent = events[4];

    await EventService.deleteEvent(originalEvent.id);

    await expect(
      jsonServer.get(`/events/${originalEvent.id}`).then(res => res.data)
    ).rejects.toThrow('Request failed with status code 404');

    // Undo
    await jsonServer.post('/events', originalEvent);
  });
});
