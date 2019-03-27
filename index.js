require('newrelic');
import express from 'express';
import request from 'request';
import path from 'path';

const PORT = process.env.PORT || 80;
const url = process.env.microserviceurl || 'http://localhost:3000';

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

import config from './config';
import { attachBundles } from './app/helpers/bundleLoader.js';
const services = attachBundles(config, './app/models/services', './dist/services');

import { renderClientPage } from './app/models/template';

app.get('/song/:songId', (req,res) => {
  const frontEnd = renderClientPage(services);
  res.status(200).send(frontEnd);
})

app.use('/api', (req, res) => {
  request(url + req.originalUrl).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy listening to ${PORT}`)
});
