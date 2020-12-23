import { Router } from 'express';
export const apiV1Controllers: Router = Router();

apiV1Controllers.get('/test', (req, res) => {
  res.status(200).send('API TEST OK');
})
