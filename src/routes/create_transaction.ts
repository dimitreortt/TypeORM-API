import { Client } from './../entities/Client';
import { Transaction, TransactionTypes } from './../entities/Transaction';
import express from 'express';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) return res.json('Client not found!');

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEFPOSIT) {
    client.balance = client.balance + amount;
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = client.balance - amount;
  }

  await client.save();

  return res.json('Transaction added');
});

export { router as createTransactionRouter };
