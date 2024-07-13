import express, { Request, Response } from 'express';

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, pixeliModa!');
});

export default app;
