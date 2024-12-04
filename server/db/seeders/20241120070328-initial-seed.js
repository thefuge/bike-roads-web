'use strict';

/** @type {import('sequelize-cli').Migration} 
 * 
*/
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
      [
        {
          name: '123',
          email: '123@123',
          password: await bcrypt.hash('123', 10),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert('Students', [
      {
        name: 'Smith J.D.',
        bonus: 12
      },
      {
          name: 'Johnson A.B.',
          bonus: 11
        },
        {
          name: 'Williams C.E',
          bonus: 15
        },
        {
          name: 'Jones D.F.',
          bonus: 8
        },
        {
          name: 'Brown E.G.',
          bonus: 6
        },
    ]);
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
