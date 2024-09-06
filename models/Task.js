const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('task', TaskSchema);