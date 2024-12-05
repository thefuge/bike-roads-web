const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({ User, Route }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Route, { foreignKey: "routeId" });
    }
  }
  Rating.init(
    {
      userId: DataTypes.INTEGER,
      routeId: DataTypes.INTEGER,
      routeRate: DataTypes.INTEGER,
      routeReview: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
