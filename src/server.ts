import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PIXELIMODA_SERVER_PORT || 5000;

app.set('port', port);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, pixeliModa!');
});

app.listen(port, () => {
  console.log(`${port} port's hot!`);
});
