const { Entry } = require("../models");

const entryData = [
	{
		id: 1,
		username: "USER1",
		mood: 2,
		sleep: 8,
		food: "Pizza",
		activities: "Run",
	},
	// {
	//   sleep: 8,
	// },
	// {
	//   food:'Pizza',
	// },
	// {
	//   activities:'Run',
	// },
];

// what is this doing?
const seedEntry = () => Entry.bulkCreate(entryData);

module.exports = seedEntry;

// {
//   mood_name:'Happy',
// },

// const sequelize = require('../config/connection');
// const seedGallery = require('./galleryData');
// const seedPaintings = require('./paintingData');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });

//   await seedGallery();

//   await seedPaintings();

//   process.exit(0);
// };

// seedAll();
