const router = require("express").Router();
const { Mood, Entry } = require("../models");

// Import the custom middleware ---> WHAT DOES THIS DO?
const withAuth = require("../utils/auth");

// GET all entries for user-landing page
router.get("/", async (req, res) => {
	try {
		const dbEntry = await Entry.findAll({
			include: [
				{
					model: Entry,
					attributes: ["filename", "description"],
				},
			],
		});

		const galleries = dbGalleryData.map((gallery) =>
			gallery.get({ plain: true })
		);

		res.render("homepage", {
			galleries,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get("/entry/:id", withAuth, async (req, res) => {
	try {
		const MOOD_DB = await Entry.findByPk(req.params.id, {
			include: [
				{
					model: Entry,
					attributes: [
						"id",
						"username",
						"mood",
						"sleep",
						"food",
						"activities",
						"description",
					],
				},
			],
		});

		const gallery = dbGalleryData.get({ plain: true });
		res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get("/painting/:id", withAuth, async (req, res) => {
	try {
		const dbPaintingData = await Painting.findByPk(req.params.id);

		const painting = dbPaintingData.get({ plain: true });

		res.render("painting", { painting, loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

module.exports = router;
