import { Router } from 'express';
import { getUser } from '../controllers';
import { createUser } from '../controllers';

const router = Router();

// 프로필 조회
router.get('/profile/:id', getUser);

// 회원가입
router.post('/register', createUser);

export default router;
