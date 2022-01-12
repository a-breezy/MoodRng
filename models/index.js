const User = require('./User');
const Entry = require('./Entry');
const Mood = require('./Mood');

Entry.hasMany(Mood, {
  foreignKey: 'gallery_id',
});

Mood.belongsTo(Entry, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Entry, Mood };
