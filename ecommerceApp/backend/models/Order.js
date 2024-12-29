const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  promoCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cartItems: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Order',
  timestamps: false
});

module.exports = Order;