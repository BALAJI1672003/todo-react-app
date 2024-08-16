const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('API Route is working');
  console.log('router ser successfully');
});

// Export the router
module.exports = router;
