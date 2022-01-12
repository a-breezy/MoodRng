const { Entry } = require('../models');

const entryData = [
  {
    username:'USER1',
  },
  {
    mood: 'Happy',
  },
  {
    sleep: 8,
  },
  {
    food: 'Pizza',
  },
  {
    activities: 'Run',
  },
];

// what is this doing?
const seedEntry = () => Entry.bulkCreate(entryData);

module.exports = seedEntry;























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
