const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList');
const pdfRoute = require("./routes/pdfGenerator");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect("mongodb+srv://manoj:admin@cluster0.vbydrl3.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", pdfRoute);

// Get all todo items
app.get("/getTodoList", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.status(500).json(err));
});

// Add a new todo item
app.post("/addTodoList", (req, res) => {
    const { title, description, assigned, deadline, status } = req.body;

    TodoModel.create({
        title,
        description,
        assigned,
        deadline,
        status: status || 'Pending' // Default to "Pending" if not provided
    })
    .then((todo) => res.json(todo))
    .catch((err) => res.status(500).json(err));
});

// Update an existing todo item
app.put("/updateTodoList/:id", (req, res) => {
    const id = req.params.id;
    const { title, description, assigned, deadline, status } = req.body;

    const updateData = {
        title,
        description,
        assigned,
        deadline,
        status
    };

    TodoModel.findByIdAndUpdate(id, updateData, { new: true })
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json(err));
});

// Delete a todo item
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;

    TodoModel.findByIdAndDelete(id)
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json(err));
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
