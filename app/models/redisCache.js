const redis = require('redis');

const client = redis.createClient();

module.exports = {
  retrieve(songId) {
    return new Promise((resolve, reject) => {
      client.get(songId, (err, response) => {
        if (response) {
          resolve(JSON.parse(response));
        } else {
          reject(err);
        }
      });
    });
  },
  cache(songId, data) {
    return new Promise((resolve, reject) => {
      client.setex(songId, 100, JSON.stringify(data), (err, response) => {
        if (response === 'OK') {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },
  resetExpiration(songId) {
    return new Promise((resolve, reject) => {
      client.expire(songId, 5000, (err, response) => {
        if (response) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },
};
