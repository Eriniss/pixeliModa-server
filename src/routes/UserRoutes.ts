import { Router } from 'express';
import { getUser, createUser, signInUser } from '../controllers';

const router = Router();

// 프로필 조회
router.get('/profile/:id', getUser);

// 회원가입
router.post('/register', createUser);

// 로그인
router.post('/sign-in', signInUser);

export default router;
