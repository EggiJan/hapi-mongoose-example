import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/apiv3', {useMongoClient: true});

const db = Mongoose.connection;

db.on('error', (error) => {
  throw error;
});

db.once('open', () => {
  console.log('Connection with database succeeded.');
});

export default db;