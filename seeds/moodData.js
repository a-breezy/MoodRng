const { Mood } = require('../models');

const moodData = [
  {
    mood_name: 'Happy',
  },
  {
    mood_emoji: 'Smile',
  },
  {
    mood_color: 'Blue',
  }
];

// what is this doing?
const seedMood = () => Mood.bulkCreate(moodData);

module.exports = seedMood;