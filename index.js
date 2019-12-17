require('dotenv').config();
const express = require('express');
const app = express();
const server = app.listen(process.env.PORT, err => {
  if (err) throw err;
  console.log('server listening port ' + process.env.PORT);
})

app.use('/public', express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
})