const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let todos = [
    { id: 1, task: "Learn Node.js", completed: false },
    { id: 2, task: "Practice Express", completed: true }
];

app.get('/', (req, res) => {
    res.send('My Week 3 Todo API!');
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/active', (req, res) => {
    const activeTodos = todos.filter(todo => !todo.completed);

    res.json(activeTodos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    res.json(todo);
});

app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({
            error: "Task field is required"
        });
    }

    const newTodo = {
        id: todos.length > 0
            ? Math.max(...todos.map(todo => todo.id)) + 1
            : 1,
        task: task,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    const { task, completed } = req.body;

    if (task !== undefined) {
        todo.task = task;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    const deletedTodo = todos.splice(todoIndex, 1);

    res.json({
        message: "Todo deleted successfully",
        todo: deletedTodo[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});