const { Mood } = require('../models');

const moodData = [
  {
    mood_name: 'Happy',
  },
  {
    mood_emoji: 'Shorts',
  },
  {
    mood_color: 'Music',
  }
];

// what is this doing?
const seedMood = () => Mood.bulkCreate(moodData);

module.exports = seedMood;