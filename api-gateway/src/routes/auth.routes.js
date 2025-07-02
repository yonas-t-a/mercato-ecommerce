import { Router } from 'express';
import { proxy } from '../middlewares/proxy.middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const authServiceUrl = process.env.AUTH_SERVICE_URL;

// Manually map each route
router.post('/register', (req, res, next) => {
  console.log('Proxying /auth/register to', authServiceUrl + '/api/auth/register');
  req.url = '/api/auth/register';
  next();
}, proxy(authServiceUrl));

router.post('/login', (req, res, next) => {
  req.url = '/api/auth/login';
  next();
}, proxy(authServiceUrl));

router.post('/request-password-reset', (req, res, next) => {
  req.url = '/api/auth/request-password-reset';
  next();
}, proxy(authServiceUrl));

export default router;
