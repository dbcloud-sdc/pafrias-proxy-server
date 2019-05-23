import express from 'express';
import request from 'request';

const playerUrl = process.env.playerUrl || 'http://localhost:3001';
const artistUrl = process.env.artistUrl || 'http://localhost:3002';
const relatedUrl = process.env.relatedUrl || 'http://localhost:3003';
const commentsUrl = process.env.commentsUrl || 'http://localhost:3004';

const router = express.Router();

router.use('/song_Id', (req, res) => {
  request(playerUrl + req.originalUrl).pipe(res);
})

router.use('/description', (req, res) => {
  request(artistUrl + req.originalUrl).pipe(res);
})

router.use('/relatedTracks', (req, res) => {
  request(relatedUrl + req.originalUrl).pipe(res);
})

router.use('/comments', (req, res) => {
  request(commentsUrl + req.originalUrl).pipe(res);
})

export default router;
