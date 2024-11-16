import { Router } from 'express';
import { createPost } from '../controllers/index';

const router = Router();

// 블로그글 포스팅
router.post('/post', createPost);

export default router;
