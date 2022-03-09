# Async Await Exercise

## Step 1 : CRUD Methods with insomnia

Serve the database by running

```bash
npm serve:db
```

There's a REST resource that is being served at `/events`
Open insomnia and create example requests for

1. Get all events
2. Get events with pagination using the query paramters `_limit` and `_page`
3. Get a single event
4. Create an event
5. Update an event (complete)
6. Delete an event

## Step 2: axios with promises

Now we want to implement these requests as Javascript functions using axios.

Open the file src/axios-exercise.js and try to implement the functions you find there.

The logAllEvents function is already implemented and can guide you. Use promises.

If you get stuck, checkout the axios documentation at <https://github.com/axios/axios>

You can run the test suite by running

```
npm test
```

Make sure that the json-server is still running in the background.

## Step 3: Refactor to async await

When all tests are passing, refactor the event-service to use async await.
