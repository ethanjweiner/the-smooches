import express from 'express';
// const path = require('path');
const app = express();

// Works in `build`
// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/', function (_, res) {
//   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

app.get('/api/get', (_, res) => {
  res.send('Send some text back!');
});

const port = 8080;
app.listen(port);
