import { Router } from 'express';
import { createPost, getPost, updatePost, deletePost } from '../controllers/index';

const router = Router();

// 블로그글 포스팅
router.post('/post', createPost);

// 블로그글 조회
router.get('/post/:id', getPost);

// 블로그글 업데이트
router.post('/post/update/:id', updatePost);

// 블로그글 삭제
router.delete('/post/:id', deletePost);

export default router;
