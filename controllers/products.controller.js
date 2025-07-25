import * as ProductService from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await ProductService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  const success = await ProductService.deleteProduct(req.params.id);
  if (!success) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
};
