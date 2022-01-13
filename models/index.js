const User = require("./User");
const Entry = require("./Entry");
const Mood = require("./Mood");

User.hasMany(Entry, {
	foreignKey: "user_id",
});

Entry.belongsTo(User, {
	foreignKey: "user_id",
});

Entry.hasOne(Mood, {
	foreign: "mood_id",
});

Mood.belongsTo(Entry, {
	foreign: "mood_id",
});

module.exports = { User, Entry, Mood };
