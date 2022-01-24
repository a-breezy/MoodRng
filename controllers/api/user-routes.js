const router = require("express").Router();
const { User } = require("../../models");

// create a new user
router.post("/", async (req, res) => {
	try {
		const dbUserData = await User.create({
			username: req.body.username,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		});

		req.session.save(() => {
			req.session.loggedIn = true;

			res.status(200).json(dbUserData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// route to log in a user
router.post("/login", async (req, res) => {
	try {
		const dbUserData = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		console.log("DB USER DATA", dbUserData);
		if (!dbUserData) {
			res
				.status(400)
				.json({ message: "Incorrect email or password. Please re-enter!" });
			return;
		}

		const validPassword = await dbUserData.checkPassword(req.body.password);

		if (!validPassword) {
			res
				.status(400)
				.json({ message: "Incorrect email or password. Please re-enter!" });
			return;
		}
		// saving session data ---on client side, cookie is saved. If the two match, then user IS logged in
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = dbUserData.dataValues.id;

			res.status(200).redirect("/");
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// route to logout user
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
