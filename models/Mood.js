const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Mood extends Model {}

Mood.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		mood_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mood_emoji: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mood_color: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "mood",
	}
);

module.exports = Mood;
