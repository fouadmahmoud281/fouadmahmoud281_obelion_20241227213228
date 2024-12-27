const express = require('express');
const router = express.Router();
const {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders
} = require('../controllers/orderController');

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
