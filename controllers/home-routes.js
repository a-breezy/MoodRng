const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Entry, User } = require("../models");

// Import the custom middleware ---> WHAT DOES THIS DO? ---> This creates a promise that must be resolved in order for app to progress
const withAuth = require("../utils/auth");

// route to render homepage
router.get("/", async (req, res) => {

	console.log("RENDER HOMEPAGE")
	try {	
		res.render("homepage", {

			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	console.log(req.session.loggedIn, " ", req.session.userId);
	console.log(req.session);
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

// 	res.render("login");
// });

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


module.exports = router;
