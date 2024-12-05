const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Route, Rating }) {
      this.hasMany(Route, { foreignKey: "ownerId", as: "routes" });
      this.hasMany(Rating, { foreignKey: "userId" });
      // this.belongsToMany(Route, {
      //   through: Rating,
      //   foreignKey: "userId",
      //   otherKey: "routeId",
      // });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
