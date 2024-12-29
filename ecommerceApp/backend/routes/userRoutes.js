const express = require('express');
const router = express.Router();
const {
  getUserInfo,
  updateUserInfo,
  getUserOrderHistory,
  addOrder,
  updateOrderStatus
} = require('../controllers/userController');

router.get('/users/:id', getUserInfo);
router.put('/users/:id', updateUserInfo);
router.get('/users/:id/orders', getUserOrderHistory);
router.post('/orders', addOrder);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
