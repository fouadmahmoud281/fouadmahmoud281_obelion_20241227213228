module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword1',
      phone: '1234567890',
      address: '123 Elm Street'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'hashedpassword2',
      phone: '0987654321',
      address: '456 Oak Avenue'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
