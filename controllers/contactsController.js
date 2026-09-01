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

module.exports = { getAllContacts, getContactById };