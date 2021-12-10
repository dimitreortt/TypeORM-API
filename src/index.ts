import { Transaction } from './entities/Transaction';
import { Banker } from './entities/Banker';
import { Client } from './entities/Client';
import { createConnection } from 'typeorm';
import express from 'express';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { createTransactionRouter } from './routes/create_transaction';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientsRouter } from './routes/fetch_clients';

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'typeorm',
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    console.log('Connected to Postgres');

    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientsRouter);

    app.listen(8080, () => {
      console.log('app running in port 8080');
    });
  } catch (error) {
    console.error('Unable to connect to Postgres');
    console.log(error.message);
  }
};

main();
