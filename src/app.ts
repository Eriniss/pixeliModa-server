import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import testRoutes from './routes/TestRoutes';

dotenv.config();
// DB 연결
connectDB();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 테스트 라우트 설정 -> 테스트
app.use('/api/test', testRoutes);

// 루트(홈)) 라우팅 설정 -> 테스트
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, pixeliModa!');
});

export default app;
