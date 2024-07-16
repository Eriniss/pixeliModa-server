import { Router } from 'express';
import { getTestMessage } from '../controllers/TestController';

const router = Router();

router.get('/', getTestMessage);

export default router;
