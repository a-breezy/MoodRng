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
		// does DataType need to change for emoji?
		mood_emoji: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		//Check on datatype for mood color--string?
		mood_color: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "mood",
		timestamps: false
	}
);

module.exports = Mood;
