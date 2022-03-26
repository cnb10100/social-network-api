// Require (Express Router)
const router = require('express').Router();

// Set routes
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// Add `/users` prefix to created routes 
router.use('/users', usersRoutes);

// Add `/thoughts` prefix to created routes 
router.use('/thoughts', thoughtsRoutes);

// Export Router
module.exports = router;