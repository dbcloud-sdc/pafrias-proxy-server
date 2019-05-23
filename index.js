require('newrelic');
import express from 'express';
import path from 'path';
import router from './app/controllers/router';

const PORT = process.env.PORT || 80;

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

app.use('/api/song/:songId', router);

app.listen(PORT, () => {
  console.log(`Proxy listening to ${PORT}`)
});
