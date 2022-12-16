import express from 'express';
// const path = require('path');
const app = express();

// Works in `build`
// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/', function (_, res) {
//   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

app.get('/api/test', (_, res) => {
  res.send('some text!');
});

const port = 8080;
app.listen(port);
