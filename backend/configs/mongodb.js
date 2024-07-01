const mongoose = require("mongoose");
// const { MongoMemoryServer } = require('mongodb-memory-server');

async function connect() {
    // const mongodb = await MongoMemoryServer.create();
    // const getUri = mongodb.getUri();
    const getUri = "mongodb+srv://username:p4ssword@srv.fx2lunc.mongodb.net/?retryWrites=true&w=majority&appName=srv";
    

    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(getUri);
    console.log("Database connected");
    return db;
}

module.exports = connect;