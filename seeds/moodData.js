const { Mood } = require('../models');

const moodData = [
  {
    id: 1,
    mood_name: 'Happy',
    mood_emoji: 'Smile',
    mood_color: 'Blue',
  },
  // {
  //   mood_emoji: 'Smile',
  // },
  // {
  //   mood_color: 'Blue',
  // }
];

// what is this doing?
const seedMood = () => Mood.bulkCreate(moodData);

module.exports = seedMood;