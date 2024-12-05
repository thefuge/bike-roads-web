const { User, Route, Rating, sequelize } = require("./db/models");

// IIFE
const pretty = (obj) => JSON.parse(JSON.stringify(obj));

async function main() {
  try {
    const allRated = await Route.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              "COALESCE",
              sequelize.fn("AVG", sequelize.col("ratings.routeRate")),
              0
            ),
            "average_rating",
          ],
        ],
      },
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [],
        },
      ],
      group: ["Route.id"],
      order: [[sequelize.col("average_rating"), "DESC"]],
    });

    // const formattedRoutes = allRated.map((route) => ({
    //   ...route.toJSON(), // Преобразуем в объект
    //   averageRating: route.dataValues.average_rating, // Добавляем averageRating
    // }));


    console.dir(pretty(allRated), { depth: null });

    // const id = 1;
    // const oneRoute = await Route.findByPk(id);

    // const ratings = await Rating.findAll({
    //   where: { routeId: id },
    // });

    // const averageRating =
    //   ratings.length > 0
    //     ? ratings.reduce((sum, rating) => sum + rating.routeRate, 0) /
    //       ratings.length
    //     : 0;
    // console.log({ ...oneRoute.toJSON(), averageRating });
  } catch (error) {
    console.log(error);
  }
}

main();
