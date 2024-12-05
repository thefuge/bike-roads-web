const routeRouter = require("express").Router();
const { User, Route, Rating } = require("../../db/models");
const { veryfyAccessToken } = require("../middlewares/verifyAccessToken");

routeRouter.route("/all").get(async (req, res) => {
  try {
    const routesAll = await Route.findAll();
    res.json(routesAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

routeRouter.route("/allRated").get(async (req, res) => {
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
    console.dir(pretty(allRated), { depth: null });
  } catch (error) {
    console.log(error);
  }
});
