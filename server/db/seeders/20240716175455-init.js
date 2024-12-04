const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John',
          email: 'john@example.com',
          password: bcrypt.hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane',
          email: 'jane@example.com',
          password: bcrypt.hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
