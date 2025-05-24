const express = require('express');
const router = express.Router();
const TodoModel = require('../models/todoList'); // adjust path as needed

// Get all todo items
router.get('/', (req, res) => {
  TodoModel.find({})
    .then(todoList => res.json(todoList))
    .catch(err => res.status(500).json(err));
});

// Add a new todo item
router.post('/', (req, res) => {
  const { title, description, assigned, deadline, status } = req.body;

  TodoModel.create({
    title,
    description,
    assigned,
    deadline,
    status: status || 'Pending'
  })
    .then(todo => res.json(todo))
    .catch(err => res.status(500).json(err));
});

// Update an existing todo item
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, assigned, deadline, status } = req.body;

  const updateData = { title, description, assigned, deadline, status };

  TodoModel.findByIdAndUpdate(id, updateData, { new: true })
    .then(todo => res.json(todo))
    .catch(err => res.status(500).json(err));
});

// Delete a todo item
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  TodoModel.findByIdAndDelete(id)
    .then(todo => res.json(todo))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
