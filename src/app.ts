import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import testRoutes from './routes/TestRoutes';
import TestDocument from './models/TestDocument';

dotenv.config();
connectDB();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/api/test', testRoutes);

app.get('/', async (req: Request, res: Response) => {
  try {
    const testDoc = await TestDocument.findOne();
    if (testDoc) {
      res.send(testDoc.test);
    } else {
      res.status(404).send('No test document found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default app;
