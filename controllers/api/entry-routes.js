const router = require("express").Router();
const { Entry } = require("../../models");
const withAuth = require("../../utils/auth");

// create new entry based on user's input
router.post("/", async (req, res) => {
	console.log("BODY", req.body);
	try {
		const dbMoodData = await Entry.create({
			user_id: req.session.userId,
			mood: Number(req.body.mood),
			sleep: Number(req.body.sleep),
			food: req.body.food,
			activities: req.body.activities,
		});

		res
			.status(200)
			.json({ message: "Entry successfully created!", data: dbMoodData });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/graph", async (req, res) => {
	try {
		const entryData = await Entry.findAll();
		const entries = entryData.map((e) => e.get({ plain: true }));
		res.json(entryData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// get all entries for logged in user to input into graph
router.get("/", (req, res) => {
	const entryData = Entry.findAll({
		where: {
			user_id: req.session.userId,
		},
		attributes: ["id", "mood", "sleep", "food", "activities", "created_at"],
	})
		.then((entryData) => res.json(entryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// ***SHOULD BE MOVED TO API ROUTES BC OF THE RENDER
// GET ONE ENTRY
// Use the custom middleware before allowing the user to access the INDIVIDUAL ENTRIES
// WHEN A USER CLICKS ON THE POINT ON THE PLOT, IT BRINGS UP /ENTRY/:ID
router.get("/entry/:id", withAuth, async (req, res) => {
	try {
		//  NEED TO CHANGE THIS TO THE NAME OF THE DATABASE FOR THE VARIABLE NAME AND AWAIT ON ENTRY.FINDBYPRIMARYKEY...
		// THIS WILL BE USED TO FIND THE FULL INFORMATION ON ANY INDIVIDUAL ENTRY AND POPULATE UNDERNEATH THE GRAPH
		// PERHAPS HAVE IT AUTOMATICALLY SHOW THE MOST RECENT ENTRY AS A PLACE HOLDER AND CHANGE TO WHICH EVER ONE IS CLICKED ON?
		const dbMoodData = await Entry.findByPk(req.params.id, {
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
						"created_at",
					],
				},
			],
		});
		const userGraph = dbMoodData.get({ plain: true });
		// THIS render needs to render within the user_page, without creating a new page
		// PERHAPS THIS IS A HANDLEBARD PARTIAL
		res.render("graph_stats", { userGraph, loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
