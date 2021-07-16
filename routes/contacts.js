const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', auth, async (request, response) => {
    try {
        const contacts = await Contact.find({ user: request.user.id }).sort({ date: -1 });
        response.json(contacts);
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth,
    [check('name', 'Please enter a name').not().isEmpty()]
], async (request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = request.body;

    try {
        
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: request.user.id
        });

        const contact = await newContact.save();
        response.json(contact);
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (request, response) => {
    
    const { name, email, phone, type } = request.body;

    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    
    try {
        
        let contact = await Contact.findById(request.params.id);

        if(!contact) return response.status(404).json({ msg: 'Contact not found' });

        // check if user owns contact
        if(contact.user.toString() !== request.user.id) {
            return response.status(401).json({ msg: 'Not Authorized' });
        }

        contact = await Contact.findByIdAndUpdate(request.params.id, 
            { $set: contactFields }, 
            { new: true }
        );

        response.json(contact);
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (request, response) => {

    try {
        
        let contact = await Contact.findById(request.params.id);

        if(!contact) return response.status(404).json({ msg: 'Contact not found' });

        // check if user owns contact
        if(contact.user.toString() !== request.user.id) {
            return response.status(401).json({ msg: 'Not Authorized' });
        }

        await Contact.findByIdAndRemove(request.params.id);

        response.json({ msg: "Contact removed" });
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

module.exports = router;