const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../app');
chai.use(chaiHttp);
const { expect } = chai;

before(async () => {
    await mongoose.connect('mongodb://localhost:27018/Boo');
});

after(async () => {
    await mongoose.disconnect();
});