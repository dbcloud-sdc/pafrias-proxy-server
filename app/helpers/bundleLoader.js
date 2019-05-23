import fs from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'bluebird';

const fileExists = promisify(fs.exists);

const loadBundle = function(cache, item, filename) {
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    console.log('loading:', filename);
    cache[item] = require(filename).default;    
  }, 0);
};

const fetchBundles = (services, path, require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}.js`;
    fileExists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          const url = `${services[item]}.js`;
          console.log(`Fetching: ${url}`);
          // see: https://www.npmjs.com/package/node-fetch
          fetch(url)
            .then(res => {
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log(err, 'WARNING: Unknown fs error');
        }
      });
  });
};

export function attachBundles(services, serverPath, distributionPath) {
  fetchBundles(services, serverPath, true);
  fetchBundles(services, distributionPath);
  return services;
};
