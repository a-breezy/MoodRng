const seedEntry = require('./entryData');
const seedMood = require('./moodData');
const seedUser = require('./userData');
// Do we need a through table?
//foreign key explanation?

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedEntry();
  console.log('\n----- ENTRY TABLE SEEDED -----\n');

  await seedMood();
  console.log('\n----- MOOD TABLE SEEDED -----\n');

  await seedUser();
  console.log('\n----- USER TABLE SEEDED -----\n');
  
// what is this doing?
  process.exit(0);
};

seedAll();