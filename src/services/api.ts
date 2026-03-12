import axios from 'axios';
import { Product } from '../models/types';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com',  // fallback for safety
  timeout: 12000,
});

// rest of your code remains exactly the same
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get<Product[]>('/products');
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch products. Please try again.');
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};