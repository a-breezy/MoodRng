const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Entry extends Model {}

Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    mood: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sleep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    food: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "entry",
  }
);

module.exports = Entry;
