const router = require('express').Router();

const userRoutes = require('./user-routes');

const entryRoutes = require('./entry-routes');

router.use('/users', userRoutes);
router.use('/entries', entryRoutes);

module.exports = router;
