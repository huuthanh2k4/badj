const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// Load JSON
const loadData = () => JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const saveData = (data) => fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

// Get current data
app.get('/data', (req, res) => {
    const data = loadData();
    res.json(data);
});

// Add user
app.post('/add', (req, res) => {
    const { name, age } = req.body;
    const data = loadData();
    data.users.push({ name, age });
    saveData(data);
    res.status(200).send('User added');
});

// Delete user
app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const data = loadData();
    data.users.splice(index, 1);
    saveData(data);
    res.status(200).send('User deleted');
});

// Record response
app.post('/response', (req, res) => {
    const { response } = req.body;
    const data = loadData();
    data.response = response;
    saveData(data);
    res.status(200).send('Response recorded');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
