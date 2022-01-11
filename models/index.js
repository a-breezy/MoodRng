const User = require('./User');
const Entry = require('./Entry');
const Moods = require('./Mood');

Entry.hasMany(Moods, {
  foreignKey: 'gallery_id',
});

Moods.belongsTo(Entry, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Entry, Moods };
