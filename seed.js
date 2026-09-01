const { connectToDatabase } = require('./db/connection');

const contacts = [
    {
        firstName: 'Shan',
        lastName: 'Volante',
        email: 'shanvolante@gmail.com',
        favoriteColor: 'Black',
        birthday: '2001-07-02',
    },
    {
        firstName: 'Ian',
        lastName: 'Van Houten',
        email: 'ianvanhouten@gmail.com',
        favoriteColor: 'Blue',
        birthday: '2004-02-15',
    },
    {
        firstName: 'Romeo',
        lastName: 'Magbanua',
        email: 'romeomagbanua@gmail.com',
        favoriteColor: 'Red',
        birthday: '1966-03-09',
    },
];

async function seed() {
    const db = await connectToDatabase();
    const collection = db.collection('contacts');

    await collection.deleteMany({});
    const result = await collection.insertMany(contacts);

    console.log(`Inserted ${result.insertedCount} contacts`);
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});