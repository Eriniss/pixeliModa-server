import { Router } from 'express';
import { getUserInfo } from '../controllers/User';

const router = Router();

// 테스트 메시지를 출력하는 라우터
router.get('/profile/:id', getUserInfo);

export default router;
