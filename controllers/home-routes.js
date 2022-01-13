const router = require('express').Router();
// FOR THE HOMEPAGE, WE WILL REQUIRE ATRIBUTES FOUND ON THE USER, MOOD, AND ENTRY MODELS FILE
const { Mood, Entry } = require('../models');

// Import the custom middleware ---> WHAT DOES THIS DO?
const withAuth = require("../utils/auth");

// GET ALL ENTRIES FOR AN INDIVDUAL USER
router.get('/', async (req, res) => {
  try {
    // NEED TO CHANGE THIS TO THE NAME OF THE DATABASE FOR THE VARIABLE NAME, AND AWAIT ON ENTRY.FINDALL...THIS WILL BE USED TO POPULATE GRAPH
    const dbGalleryData = await Gallery.findAll({
      include: [
        // WILL NEED TO CHANGE THE MODEL TO ENTRY
        {
          model: Entry,
          // MOOD, MOODCOLOR, DATE OF ENTRY FOR THE GRAPH AND sleep, food, activities FOR WHEN A USER HOVERS OVER AN ENTRY DATA POINT, BUT DOESNT CLICK
          attributes: ['sleep', 'description'],
        },
      ],
    });
// THESE SHOULD ALL BE CHANGED TO ENTRY, THE DB TO THE DATABASE VARIABLE NAMED ABOVE
    const galleries = dbGalleryData.map((gallery) =>
    // WHAT DOES PLAIN: TRUE DO?
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

// GET ONE ENTRY
// Use the custom middleware before allowing the user to access the INDIVIDUAL ENTRIES
// WHEN A USER CLICKS ON THE POINT ON THE PLOT, IT BRINGS UP /ENTRY/:ID
router.get('/gallery/:id', withAuth, async (req, res) => {
  try {
    //  NEED TO CHANGE THIS TO THE NAME OF THE DATABASE FOR THE VARIABLE NAME AND AWAIT ON ENTRY.FINDBYPRIMARYKEY...
    // THIS WILL BE USED TO FIND THE FULL INFORMATION ON ANY INDIVIDUAL ENTRY AND POPULATE UNDERNEATH THE GRAPH
    // PERHAPS HAVE IT AUTOMATICALLY SHOW THE MOST RECENT ENTRY AS A PLACE HOLDER AND CHANGE TO WHICH EVER ONE IS CLICKED ON?
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          // CHANGE MODEL TO ENTRY
          model: Painting,
          // CHANGE THE ATTRIBUTES ID, MOOD, SLEEP, FOOD, ACTIVITIES, DESCRIPTION
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });
// THESE SHOULD ALL BE CHANGED TO ENTRY, THE DB TO THE DATABASE VARIABLE NAMED ABOVE
    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// CREATE NEW ENTRY
router.post('FILLINHEREPROPERROUTE', async (req, res) => {
  try {
    // NEED TO CHANGE THIS TO THE NAME OF THE DATABASE FOR THE VARIABLE NAME
    // CHANGE TO AWAIT ENTRY.CREATE
    const dbUserData = await User.create({
      // CHANGE THE BELOW TO MOOD, SLEEP, FOOD, ACTIVITIES, DESCRIPTION
      username: req.body.username,
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


// GET one painting
// // Use the custom middleware before allowing the user to access the painting
// router.get('/painting/:id', withAuth, async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });

//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

	res.render("login");
});

module.exports = router;
