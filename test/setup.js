const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
};

const disconnectDB = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

module.exports = { connectDB, disconnectDB };