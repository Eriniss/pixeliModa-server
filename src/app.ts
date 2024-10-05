import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/UserRoutes';
import cors from 'cors';

dotenv.config();

// DB 연결
connectDB();

const app = express();

/**
 * @description CORS 미들웨어 설정
 * @origin 클라이언트 출처를 지정
 * @methods 허용할 HTTP 메서드를 지정
 * @allowedHeaders 허용할 헤더를 지정
 */
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// CORS 미들웨어를 앱에 추가
app.use(cors(corsOptions));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 유저 라우트 설정
app.use('/users', userRoutes);

// 루트(홈) 라우팅 설정 -> 테스트
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, pixeliModa!');
});

export default app;
