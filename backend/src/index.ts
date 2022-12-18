require('dotenv').config();

import express from 'express';
const app = express();

app.get('/api/get', (_, res) => {
  res.send('Send some text back!');
});

app.listen(process.env.PORT);
