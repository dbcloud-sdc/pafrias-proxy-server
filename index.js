require('newrelic');
const express = require('express');
const request = require('request');
const { url } = require('./config.js')

const PORT = process.env.PORT || 80;

const url = process.env.serviceurl || 'http://localhost:3000';

const app = express();

// fill in file route for static assets

app.get('/loaderio-f18acd640ba89b9eb3cefecdf550ce8b', (req, res) => {
  res.sendFile(path.resolve(__dirname, './loaderio.txt'));
});

app.use('/api', (req, res) => {
  var url = url + req.url;
  request(url).pipe(res);
})

app.listen(PORT, () => {
  console.log(`Proxy listening to ${PORT}`)
})

/*
router.get('/:songId/comments', (req, res) => {
  const { songId } = req.params;
  retrieve(songId)
    .then(data => resetExpiration(songId)
      .then(() => {
        res.status(200).send(data);
      })
      .catch(() => {
        console.log('error reseting expiration');
      }))
    .catch(() => db.readComments(songId)
      .then((data) => {
        cache(songId, data)
          .then(() => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      }));
});
*/
