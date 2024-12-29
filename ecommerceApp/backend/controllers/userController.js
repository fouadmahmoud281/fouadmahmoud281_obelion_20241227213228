const User = require('../models/User');
const Order = require('../models/Order');

// Get user information
const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user personal information
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, address } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({ name, email, phone, address });

    res.json({ message: 'User information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user order history
const getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.findAll({ where: { userId } });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add new order for user
const addOrder = async (req, res) => {
  try {
    const { userId, productDetails, status, totalAmount } = req.body;
    const newOrder = await Order.create({ userId, productDetails, status, totalAmount });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  getUserOrderHistory,
  addOrder,
  updateOrderStatus
};
