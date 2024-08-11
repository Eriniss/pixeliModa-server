import { Router } from 'express';
import { getTestMessage } from '../controllers/TestController';

const router = Router();

// 테스트 메시지를 출력하는 라우터
router.get('/', getTestMessage);

export default router;
