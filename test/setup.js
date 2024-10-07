import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

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

export default { connectDB, disconnectDB };