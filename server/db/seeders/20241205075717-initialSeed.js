/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Bob",
        email: "ololo@trololo.com",
        password: "qwertY1@",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John",
        email: "trololo@trololo.com",
        password: "qwertY1@",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marta",
        email: "ololo@ololo.com",
        password: "qwertY1@",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Routes", [
      {
        title: "Elbrus 2025",
        startPoint: "46.879496, 35.374006",
        endPoint: "46.821952, 35.344738",
        location: "Запорожская область",
        routeLength: 8000,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Буткамп ЭЭЭ",
        startPoint: "52.971629, 36.085482",
        endPoint: "52.911420, 35.995899",
        location: "Орел",
        routeLength: 11000,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Московский областной",
        startPoint: "55.949500, 37.540735",
        endPoint: "55.974615, 37.723257",
        location: "МО",
        routeLength: 15500,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Ratings", [
      {
        userId: 1,
        routeId: 1,
        routeRate: 5,
        routeReview: 'Идеально',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        routeId: 1,
        routeRate: 4,
        routeReview: 'Нормально',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        routeId: 2,
        routeRate: 5,
        routeReview: 'Шикарно',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        routeId: 2,
        routeRate: 3,
        routeReview: 'Средне',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        routeId: 3,
        routeRate: 3,
        routeReview: 'Неоч',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        routeId: 3,
        routeRate: 2,
        routeReview: 'Вообще никак',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Routes', null, {});
    await queryInterface.bulkDelete('Ratings', null, {});
  },
};
