const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 80;

const app = express();


app.use('/api', (req, res) => {
//  console.log('we did it?', req.url, req.body);
  var url = `http://localhost:3000${req.url}`;
  request(url).pipe(res);
})

app.listen(PORT, () => {
  console.log(`Proxy listening to ${PORT}`)
})
