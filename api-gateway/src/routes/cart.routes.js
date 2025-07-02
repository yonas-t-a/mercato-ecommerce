import { Router } from 'express';
import { proxy } from '../middlewares/proxy.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';
import { getProductById } from '../services/product.service.js';

dotenv.config();

const router = Router();
const cartServiceUrl = process.env.CART_SERVICE_URL;

// Middleware to inject user_id and validate product_id for add/update
const injectUserAndValidateProduct = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    if (req.body.product_id) {
      // Validate product exists
      await getProductById(req.body.product_id);
    }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid product_id' });
  }
};

router.get('/', verifyToken, proxy(cartServiceUrl));
router.post('/add', verifyToken, injectUserAndValidateProduct, proxy(cartServiceUrl));
router.put('/update', verifyToken, injectUserAndValidateProduct, proxy(cartServiceUrl));
router.delete('/remove/:productId', verifyToken, proxy(cartServiceUrl));

export default router;
