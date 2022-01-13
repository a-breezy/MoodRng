const { User } = require('../models');

const userData = [
  {
    id: 1,
    username: 'User1',
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'JaneDoe@gmail.com',
    password: 'Password123',
  },
  // {
  //   first_name: 'Jane',
  // },
  // {
  //   last_name: 'Doe',
  // },
  // {
  //   email: 'JaneDoe@gmail.com',
  // },
  // {
  //   password: 'Password123',
  // },
];

// what is this doing?
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;