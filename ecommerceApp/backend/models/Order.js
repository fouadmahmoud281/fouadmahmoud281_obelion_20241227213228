const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Order extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productDetails: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['pending', 'completed', 'shipped', 'cancelled']],
        },
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
    }, {
      sequelize,
      modelName: 'Orders',
      timestamps: false,
    });
  }
}

Order.init(sequelize);

module.exports = Order;