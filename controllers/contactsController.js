const Contact = require('../models/Contact');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contacts', error: err.message });
    }
};

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid contact id format' });
        }
        res.status(500).json({ message: 'Error fetching contact', error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
        const savedContact = await newContact.save();
        res.status(201).json({ id: savedContact._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: Object.values(err.errors).map((e) => e.message),
            });
        }
        res.status(500).json({ message: 'Error creating contact', error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, favoriteColor, birthday },
            { new: true, runValidators: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: Object.values(err.errors).map((e) => e.message),
            });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid contact id format' });
        }
        res.status(500).json({ message: 'Error updating contact', error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid contact id format' });
        }
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };