const router = require("express").Router();

// route to render homepage
router.get("/", async (req, res) => {
	console.log(req.session);
	// console.log("RENDER HOMEPAGE")
	try {
		if (req.session.loggedIn) {
			res.render("homepage", {
				loggedIn: req.session.loggedIn,
			});
		} else {
			res.render("login");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Route to get to ENTRY section on homepage
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
