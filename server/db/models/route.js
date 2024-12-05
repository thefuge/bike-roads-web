const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({ User, Rating }) {
      this.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
      this.hasMany(Rating, { foreignKey: "routeId", as: "ratings" });
      // this.belongsToMany(User, {
      //   through: Rating,
      //   foreignKey: "routeId",
      //   otherKey: "userId",
      //   as: "ratings",
      // });
    }
  }
  Route.init(
    {
      title: DataTypes.STRING,
      startPoint: DataTypes.STRING,
      endPoint: DataTypes.STRING,
      location: DataTypes.STRING,
      routeLength: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};
