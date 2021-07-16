const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  public
router.post('/', (request, response) => {
    response.send('Register a user')
});

module.exports = router;