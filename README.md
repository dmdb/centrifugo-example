# centrifugo server-side publish example

Run docker-compose to start centrifugo
```docker-compose up -d```

Start backend server
```node index.js```

Backend does:
- POST /token - signs a jwt token for user with secret from config.json (same for centrifugo)
- POST /subscribe - subscribes user to a 'test_channel' using centrifugo API (server-side)
- GET /index.html - renders static script with the workflow below
- Publishes dummy payload to channel 'test_channel' every second

index.html workflow:
1. Retrieves a token from backend
2. Connects to centrifugo
3. Asks backend for server-side subscription
4. Defines event listener to console.log payloads on server-side 'publish' event as it stated in official repo
https://github.com/centrifugal/centrifuge-js#server-side-subscriptions

Then you can on http://localhost:3000 to look at server-side publications at the console

By default centrifugo runs on port 8000 and backend on port 3000
