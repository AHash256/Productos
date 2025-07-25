import * as ProductModel from '../models/products.model.js';

export const getAllProducts = () => ProductModel.getAll();
export const getProductById = (id) => ProductModel.getById(id);
export const createProduct = (data) => ProductModel.create(data);
export const deleteProduct = (id) => ProductModel.remove(id);
