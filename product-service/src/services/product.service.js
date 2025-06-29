import { Product, Review } from "../models/index.js";

export const getAllProductsService = async () => {
  return await Product.findAll({ include: Review });
};

export const createProductService = async (data) => {
  return await Product.create(data);
};

export const getProductByIdService = async (id) => {
  return await Product.findByPk(id, { include: Review });
};

export const addReviewToProductService = async (productId, user_id, rating, review) => {
  const product = await Product.findByPk(productId);
  if (!product) return null;
  return await Review.create({
    user_id,
    product_id: productId,
    rating,
    review,
  });
};

export const updateProductService = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(data);
  return product;
};

export const deleteProductService = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  // Delete all reviews for this product
  await Review.destroy({ where: { product_id: id } });
  await product.destroy();
  return true;
};

export const deleteReviewService = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  if (!review) return null;
  await review.destroy();
  return true;
};
