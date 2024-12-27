const Order = require('../models/Order');

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const { userId, productDetails, status, totalAmount } = req.body;
    const newOrder = await Order.create({ userId, productDetails, status, totalAmount });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update order by ID
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { productDetails, status, totalAmount } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ productDetails, status, totalAmount });

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
