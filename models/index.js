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
	foreignKey: "mood_id",
});

Mood.belongsTo(Entry, {
	foreignKey: "mood_id",
});

module.exports = { User, Entry, Mood };
