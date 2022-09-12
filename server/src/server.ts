import 'dotenv/config';

import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => {
  return response.status(201).json({ message: 'Teste com Browser' });
})

app.listen(process.env.PORT, () => console.log(`Server is running on Port: ${process.env.PORT}!`));
