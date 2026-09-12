const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contacts', error: err.message });
    }
};

const getContactById = async (req, res) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contact', error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday',
            });
        }

        const db = getDb();
        const newContact = { firstName, lastName, email, favoriteColor, birthday };
        const result = await db.collection('contacts').insertOne(newContact);

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating contact', error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday',
            });
        }

        const db = getDb();
        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(id) },
            { $set: { firstName, lastName, email, favoriteColor, birthday } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact', error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const db = getDb();
        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };