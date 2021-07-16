const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', (request, response) => {
    response.send('Get all contacts')
});

// @route   POST api/auth
// @desc    Add new contact
// @access  Private
router.post('/', (request, response) => {
    response.send('Add a contact')
});

// @route   PUT api/auth/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (request, response) => {
    response.send('Update a contact')
});

// @route   DELETE api/auth/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (request, response) => {
    response.send('Delete a contact')
});

module.exports = router;