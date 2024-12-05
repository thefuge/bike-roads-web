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
          as: 'ratings', 
          attributes: [], 
        },
      ],
      group: ["Route.id"], 
      order: [[sequelize.col("average_rating"), "DESC"]], 
    });
    console.dir(pretty(allRated), { depth: null });
  } catch (error) {
    console.log(error);
  }
}

main();