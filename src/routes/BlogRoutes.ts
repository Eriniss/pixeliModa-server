import { Router } from 'express';
import { createPost, getPost } from '../controllers/index';

const router = Router();

// 블로그글 포스팅
router.post('/post', createPost);

// 블로그글 조회
router.get('/post/:id', getPost);

export default router;
