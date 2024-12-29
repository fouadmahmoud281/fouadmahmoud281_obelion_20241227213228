module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', [
    {
      name: 'Product 1',
      price: 19.99,
      color: 'Red',
      brand: 'Brand A',
      type: 'Type 1',
      category: 'electronics'
    },
    {
      name: 'Product 2',
      price: 29.99,
      color: 'Blue',
      brand: 'Brand B',
      type: 'Type 2',
      category: 'fashion'
    },
    {
      name: 'Product 3',
      price: 39.99,
      color: 'Green',
      brand: 'Brand C',
      type: 'Type 1',
      category: 'electronics'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {})
};
