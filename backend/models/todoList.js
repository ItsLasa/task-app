//todoList.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assigned: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
    },
    status: { type: String, enum: ['Pending', 'In Progress', 'Done'] },
});


const todoList = mongoose.model("todo", todoSchema);

module.exports = todoList;