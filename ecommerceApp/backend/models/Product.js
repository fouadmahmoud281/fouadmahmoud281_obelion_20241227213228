const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            isDecimal: true,
            min: 0,
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isInt: true,
            min: 0,
          },
        },
      },
      {
        sequelize,
        modelName: 'Product',
        timestamps: false,
        tableName: 'products',
      }
    );
  }
}

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        country: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        promoCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        cartItems: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Order',
        timestamps: false,
      }
    );
  }
}

Product.init(sequelize);
Order.init(sequelize);

module.exports = { Product, Order };