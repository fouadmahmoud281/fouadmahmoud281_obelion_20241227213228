const { Sequelize, Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        fullName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
        country: {
          type: DataTypes.STRING,
          allowNull: false
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
      },
      {
        sequelize,
        modelName: 'Order',
        timestamps: false
      }
    );
  }
}

module.exports = Order;
