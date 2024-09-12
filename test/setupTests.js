const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
});

afterAll(async () => {
    await mongoose.connection.close();
});
