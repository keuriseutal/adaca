const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', auth, async (request, response) => {
    try {
        const tasks = await Task.find();
        response.json(tasks);
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }
});

// @route   POST api/tasks
// @desc    Add new task
// @access  Private
router.post('/', [auth,
    [check('name', 'Please enter a name').not().isEmpty()]
], async (request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { name, completed } = request.body;

    try {
        
        const newTask = new Task({
            name,
            completed,
            createdBy: request.user.id
        });

        const task = await newTask.save();
        response.json(task);
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (request, response) => {
    
    const { name, completed } = request.body;

    // Build task object
    const taskFields = {
        lastModifiedBy: request.user.id
    };
    
    if(name) taskFields.name = name;
    if(completed) taskFields.completed = completed;
    
    try {
        
        let task = await Task.findById(request.params.id);

        if(!task) return response.status(404).json({ msg: 'Task not found' });

        // check if user owns task
        if(task.user.toString() !== request.user.id) {
            return response.status(401).json({ msg: 'Not Authorized' });
        }

        task = await Task.findByIdAndUpdate(request.params.id, 
            { $set: taskFields }, 
            { new: true }
        );

        response.json(task);
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (request, response) => {

    try {
        
        let task = await Task.findById(request.params.id);

        if(!task) return response.status(404).json({ msg: 'Task not found' });

        // check if user owns task
        if(task.user.toString() !== request.user.id) {
            return response.status(401).json({ msg: 'Not Authorized' });
        }

        await Task.findByIdAndRemove(request.params.id);

        response.json({ msg: "Task removed" });
        
    } catch(error) {
        console.error(error.message);
        response.status(500).send('Server Error');
    }

});

module.exports = router;