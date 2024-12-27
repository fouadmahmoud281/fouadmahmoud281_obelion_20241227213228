const Product = require('../models/Product');

// Get all products with optional filters and sorting
const getAllProducts = async (req, res) => {
  try {
    const { category = 'all', color, brand, type, sort = 'newest' } = req.query;

    const whereClause = {};
    if (category !== 'all') whereClause.category = category;
    if (color) whereClause.color = color;
    if (brand) whereClause.brand = brand;
    if (type) whereClause.type = type;

    const order = [];
    if (sort === 'price') {
      order.push(['price', 'ASC']);
    } else if (sort === 'popular') {
      order.push(['name', 'ASC']); // Assuming 'name' as a placeholder for popularity
    } else {
      order.push(['createdAt', 'DESC']); // Assuming 'createdAt' exists for sorting by newest
    }

    const products = await Product.findAll({
      where: whereClause,
      order,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, color, brand, type, category } = req.body;
    const newProduct = await Product.create({ name, price, color, brand, type, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, color, brand, type, category } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update({ name, price, color, brand, type, category });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
