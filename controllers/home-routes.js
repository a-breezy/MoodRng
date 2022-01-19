const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Entry, User } = require("../models");

// Import the custom middleware ---> WHAT DOES THIS DO? ---> This creates a promise that must be resolved in order for app to progress
const withAuth = require("../utils/auth");

// route to render homepage
router.get("/", async (req, res) => {
	console.log(req.session)
	// console.log("RENDER HOMEPAGE")
	try {
		if (req.session.loggedIn) {
			res.render("homepage", {
				loggedIn: req.session.loggedIn
			})
		} else {
			res.render("login");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// router.get("/", async (req, res) => {
// 	console.log(req.session.loggedIn, " ", req.session.userId);
// 	console.log(req.session);
// 	if (req.session.loggedIn) {
// 		res.render("login");
// 		return;
// 	}
// });
// // 	res.render("login");
// // });

//Route to get to ENTRY section on homepage
router.get("/entry", (req, res) => {
	console.log(req.session.loggedIn, " ", req.session.userId);
	console.log(req.session);
	if (req.session.loggedIn) {
		res.redirect("/entry");
		return;
	}

	res.render("homepage");
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
					attributes: ["id", "username", "mood", "sleep", "food", "activities"],
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

router.get("/graph", function (req, res) {
	console.log("in graph route");
	res.render("graph");
});

module.exports = router;
