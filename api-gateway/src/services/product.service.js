import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product from product service');
  }
}; 