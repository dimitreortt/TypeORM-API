import { Banker } from './../entities/Banker';
import { Client } from './../entities/Client';
import express from 'express';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));
  const banker = await Banker.findOne(parseInt(bankerId));

  if (!banker || !client) {
    return res.json('Banker or client not found');
  }

  banker.clients = [client];

  await banker.save();

  return res.json('Banker connected to client');
});

export { router as connectBankerToClientRouter };
