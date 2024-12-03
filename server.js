// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static('.')); // Servir archivos estáticos

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const data = `Name: ${name}, Email: ${email}\n`;

    fs.appendFile('submissions.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Failed to write to file' });
        }
        res.send({ message: 'Data written to file' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
