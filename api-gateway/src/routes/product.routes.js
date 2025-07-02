import { Router } from 'express';
import { proxy } from '../middlewares/proxy.middleware.js';
import dotenv from 'dotenv';
import { getUserById } from '../services/user.service.js';
import axios from 'axios';

dotenv.config();

const router = Router();
const productServiceUrl = process.env.PRODUCT_SERVICE_URL;
const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL;

// Middleware to notify on product create/update/delete
const notifyOnProductChange = async (req, res, next) => {
  try {
    // Assume user_id is in req.body or req.user (if protected)
    const userId = req.body.user_id || (req.user && req.user.id);
    if (!userId) return next();
    const user = await getUserById(userId);
    if (!user.email) return next();
    // Prepare notification payload
    const subject = `Product ${req.method === 'POST' ? 'Created' : req.method === 'PUT' ? 'Updated' : 'Deleted'}`;
    const text = `A product was ${subject.toLowerCase()} by user ${user.email}`;
    await axios.post(`${notificationServiceUrl}/notify/order`, {
      email: user.email,
      subject,
      text,
    });
    next();
  } catch (err) {
    // Don't block the main request if notification fails
    next();
  }
};

router.get('/', proxy(productServiceUrl));
router.post('/', notifyOnProductChange, proxy(productServiceUrl));
router.get('/:id', proxy(productServiceUrl));
router.put('/:id', notifyOnProductChange, proxy(productServiceUrl));
router.delete('/:id', notifyOnProductChange, proxy(productServiceUrl));
router.post('/:id/review', proxy(productServiceUrl));
router.delete('/review/:reviewId', proxy(productServiceUrl));

export default router;
