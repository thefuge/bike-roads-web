const routeRouter = require("express").Router();
const { User, Route, Rating, sequelize } = require("../../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const countDistance = require("../middlewares/countDistance");

routeRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const routesAll = await Route.findAll();
      res.json(routesAll);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const { title, startPoint, endPoint, location } = req.body;

      const userId = res.locals.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const routeLength = countDistance(startPoint, endPoint);

      const newRoute = await Route.create({
        title,
        startPoint,
        endPoint,
        location: location || title,
        routeLength: routeLength || 0,
        ownerId: userId,
      });

      res.json(newRoute);
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
    console.log(allRated, 123456789)
    res.json(allRated);
  } catch (error) {
    console.log(error);
  }
});

routeRouter.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const oneRoute = await Route.findByPk(id);
    res.json(oneRoute);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}).delete(verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;

    const oneRoute = await Route.findByPk(id);
    if (!oneRoute) return res.status(404).json({ message: 'Событие не найдено' });

    if (oneRoute.userId !== res.locals.user.id) {
      return res.status(403).json({ message: 'Нет доступа' });
    }

    await Route.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

routeRouter.route("/:id_with_averagegRating").get(async (req, res) => {
  try {
    const { id } = req.params;
    const oneRoute = await Route.findByPk(id);
    if (!oneRoute) {
      return res.status(404).json({ message: "Маршрут не найден" });
    }
    const ratings = await Rating.findAll({
      where: { routeId: id },
    });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.routeRate, 0) /
          ratings.length
        : 0;
    res.json({ ...oneRoute.toJSON(), averageRating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

routeRouter.route(":id/rate").post(verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { routeRate, routeReview } = req.body;

    const userId = res.locals.user.id;
    const route = await Route.findByPk(id);

    if (!route) {
      return res.status(404).json({ message: "Маршрут не найден" });
    }

    if (!routeRate || routeRate < 1 || routeRate > 5) {
      return res
        .status(400)
        .json({ message: "Рейтинг должен быть от 1 до 5." });
    }

    const rating = await Rating.create({
      userId,
      routeId: id,
      routeRate,
      routeReview: routeReview || null,
    });

    res.json(rating);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = routeRouter;