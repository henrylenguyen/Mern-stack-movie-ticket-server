import express from 'express';
import { getToken, getTokenRemainingTime } from '../utils/token.js';

const router = express.Router();

router.get('/get-token', (req, res) => {
  const token = getToken(req, res);
  const remainingTime = getTokenRemainingTime();
  res.json({ token, thoiGianHetHan: remainingTime });
});


export default router;
