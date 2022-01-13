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
  {
    id: 2,
    username: 'User2',
    first_name: 'John',
    last_name: 'Doe',
    email: 'JohnDoe@gmail.com',
    password: 'Password123',
  },
  {
    id: 3,
    username: 'User3',
    first_name: 'Ron',
    last_name: 'Doe',
    email: 'RonDoe@gmail.com',
    password: 'Password123',
  },
 
  {
    id: 4,
    username: 'User4',
    first_name: 'Jill',
    last_name: 'Doe',
    email: 'JillDoe@gmail.com',
    password: 'Password123',
  },
 
  {
    id: 5,
    username: 'User5',
    first_name: 'Tim',
    last_name: 'Doe',
    email: 'TimDoe@gmail.com',
    password: 'Password123',
  },
 
  {
    id: 6,
    username: 'User6',
    first_name: 'Harrison',
    last_name: 'Doe',
    email: 'HarrisonDoe@gmail.com',
    password: 'Password123',
  },
 
  {
    id: 7,
    username: 'User3',
    first_name: 'Jonathan',
    last_name: 'Doe',
    email: 'JonathanDoe@gmail.com',
    password: 'Password123',
  },
 
];

// what is this doing?
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;