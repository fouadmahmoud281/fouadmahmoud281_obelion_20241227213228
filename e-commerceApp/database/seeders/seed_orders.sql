module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Orders', [
    {
      userId: 1,
      productDetails: JSON.stringify({ item: 'Laptop', quantity: 1 }),
      status: 'pending',
      totalAmount: 1299.99
    },
    {
      userId: 2,
      productDetails: JSON.stringify({ item: 'Smartphone', quantity: 2 }),
      status: 'completed',
      totalAmount: 899.99
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {})
};
