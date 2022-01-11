const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Entry extends Model {}

Entry.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mood: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sleep: {
			type: DataTypes.STRING,
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
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "entry",
	}
);

module.exports = Entry;