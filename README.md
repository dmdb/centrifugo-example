# centrifugo server-side publish bug example

Run docker-compose to start centrifugo
```docker-compose up -d```

Start backend server
```node index.js```

Backend does:
- POST /token - signs a jwt token for user with secret from config.json (same for centrifugo)
- POST /subscribe - subscribes user to a 'test_channel' using centrifugo API (server-side)
- GET /version277.html /version280.html /version282.html - renders static scripts with same workflow and different versions of centrifugo-js
- Publishes dummy payload to channel 'test_channel' every second

Static files workflow:
1. retrieve a token from backend
2. connect to centrifugo
3. ask backend for server-side subscription
4. define event listener to console.log payloads on server-side 'publish' event same way as it stated in official repo
https://github.com/centrifugal/centrifuge-js#server-side-subscriptions

Then you can go each of static endpoints to ensure how many of them responds on publishing in console
/version277.html
/version280.html
/version282.html

By default centrifugo runs on port 8000 and backend on port 3000
