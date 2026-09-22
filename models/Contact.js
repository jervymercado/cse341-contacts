const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    favoriteColor: {
        type: String,
        required: [true, 'Favorite color is required'],
        trim: true,
    },
    birthday: {
        type: String,
        required: [true, 'Birthday is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Birthday must be in YYYY-MM-DD format'],
    },
});

module.exports = mongoose.model('Contact', contactSchema);