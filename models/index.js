const User = require('./User');
const Entry = require('./Entry');
const Mood = require('./Mood');

// Entry.hasMany(Mood, {
//   foreignKey: '',
// });

// Mood.belongsTo(Entry, {
//   foreignKey: '',
// });

module.exports = { User, Entry, Mood };
