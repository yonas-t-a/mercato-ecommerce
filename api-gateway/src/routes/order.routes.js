import { Router } from 'express';
import { proxy } from '../middlewares/proxy.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';
import { getProductById } from '../services/product.service.js';

dotenv.config();

const router = Router();
const orderServiceUrl = process.env.ORDER_SERVICE_URL;

// Middleware to inject user_id and fetch product info for order items
const injectUserAndProductInfo = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    if (Array.isArray(req.body.items)) {
      const itemsWithPrice = await Promise.all(req.body.items.map(async (item) => {
        const product = await getProductById(item.product_id);
        return {
          ...item,
          price: product.price,
        };
      }));
      req.body.items = itemsWithPrice;
    }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid product_id in order items' });
  }
};

router.post('/', verifyToken, injectUserAndProductInfo, proxy(orderServiceUrl));
router.get('/:userId', verifyToken, proxy(orderServiceUrl));
router.put('/:orderId', verifyToken, proxy(orderServiceUrl));
router.delete('/:orderId', verifyToken, proxy(orderServiceUrl));

export default router;
