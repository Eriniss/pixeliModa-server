import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // 환경변수에서 MongoDB의 정보를 획득
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_COLLECTION}?authSource=${process.env.MONGO_COLLECTION}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    // 연결 실패 시 에러 핸들링
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('MongoDB connection error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
