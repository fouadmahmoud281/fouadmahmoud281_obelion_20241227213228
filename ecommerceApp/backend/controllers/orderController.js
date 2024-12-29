const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { fullName, address, city, postalCode, country, promoCode, discount, cartItems } = req.body;
    
    // Validate cartItems
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    
    // Validate shipping details
    if (!fullName || !address || !city || !postalCode || !country) {
      return res.status(400).json({ error: 'Shipping details are incomplete' });
    }
    
    // Calculate total price
    let totalPrice = 0;
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with id ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
      }
      totalPrice += product.price * item.quantity;
    }

    // Apply discount
    if (discount > 0) {
      totalPrice = totalPrice * (1 - discount / 100);
    }

    // Create new order
    const order = await Order.create({ fullName, address, city, postalCode, country, promoCode, discount, cartItems });

    // Reduce stock
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      await product.update({ stock: product.stock - item.quantity });
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order' });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, address, city, postalCode, country, promoCode, discount, cartItems } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ fullName, address, city, postalCode, country, promoCode, discount, cartItems });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the order' });
  }
};
