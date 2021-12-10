import { Banker } from './../entities/Banker';
import express from 'express';

const router = express.Router();

router.post('/api/banker', async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({ firstName, lastName, email, cardNumber, employeeNumber });

  await banker.save();

  return res.json(banker);
});

export { router as createBankerRouter };
