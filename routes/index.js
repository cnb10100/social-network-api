// Require express router
const router = require('express').Router();

// Import all API routes 
const apiRoutes = require('./api');

// add prefix of `/api` to all API routes
router.use('/api', apiRoutes);

// Error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error....</h1>');
  });

// Export router
module.exports = router;