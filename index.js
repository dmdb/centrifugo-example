const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('./config.json');

const app = express();
const port = 3000;
app.use(express.json()); 

const centrifugeApi = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    Authorization: `apikey ${config.api_key}`,
    'Content-Type': 'application/json',
  },
});

app.post('/token', (req, res) => {
  const { user } = req.body;
  res.send(jwt.sign({ sub: user }, config.token_hmac_secret_key));
});

app.post('/subscribe', async (req, res) => {
  const { user } = req.body;
  try {
    await centrifugeApi.post('', {
      method: 'subscribe',
      params: { channel: 'test_channel', user },
    });
    res.sendStatus(200);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500);
  }
});

setInterval(() => {
  centrifugeApi.post('', {
    method: 'publish',
    params: {
      channel: 'test_channel',
      data: {
        text: 'tick',
      },
    },
  });
}, 1000);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static('static'));
