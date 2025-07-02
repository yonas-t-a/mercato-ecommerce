import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user from auth service');
  }
}; 