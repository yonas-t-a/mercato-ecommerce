import { Router } from 'express';
import { register, login, requestPasswordReset } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);

export default router;