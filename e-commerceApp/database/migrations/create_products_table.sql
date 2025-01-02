const { Model, DataTypes, Sequelize } = require('sequelize');
class Product extends Model { 
  static init(sequelize) { 
    super.init({ 
      name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      }, 
      price: { 
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false 
      }, 
      color: { 
        type: Sequelize.STRING, 
        allowNull: true 
      }, 
      brand: { 
        type: Sequelize.STRING, 
        allowNull: true 
      }, 
      type: { 
        type: Sequelize.STRING, 
        allowNull: true 
      }, 
      category: { 
        type: Sequelize.STRING, 
        allowNull: false 
      } 
    }, { 
      sequelize, 
      modelName: 'Product' 
    }); 
  } 
}
module.exports = Product;
