const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user--WORKING!!!
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

// ONLY KEEP IF ADDING ADMIN ROLE, OTHWERWISE POSES SECURITY ISSUE
// router.get("/", (req, res) => {
// 	User.findAll({
// 	  attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'password'],
// 	  include: [
// 		{
// 		  model: User,
// 		  attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'password'],
// 		},
// 	  ],
// 	})
// 	  .then((userData) => res.json(userData))
// 	  .catch((err) => {
// 		console.log(err);
// 		res.status(500).json(err);
// 	  });
//   });

// LOGIN--keep in api -- WORKING!!
router.post("/login", async (req, res) => {
	
	try {
		const dbUserData = await User.findOne({
			
			where: {
				email: req.body.email
			}
			
		});
		console.log("DB USER DATA", dbUserData)
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
			
			// console.log("IN REQ SAVE");
			// console.log("user data:", dbUserData.dataValues.id );
			res
				.status(200)
				// console.log("LOGIN ROUTE TEST")
				.redirect("/")
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Logout -- WORKING!!
// deleting session data ---on client side, cookie saved becomes useless. User must log in again 
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
