const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  public
router.post('/', [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = request.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return response.status(400).json({ msg: 'User already Exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (error, token) => {
            if(error) throw error;
            response.json({ token });
        });

    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

module.exports = router;