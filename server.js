const express = require('express');
const { connectToDatabase } = require('./db/connection');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });