// spins up a throwaway in-memory mongo so the tests don't touch a real database
'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// tests connect straight through mongoose — every service's local db.js does
// the same two calls, so there's no need to borrow one of them here
const startDb = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

const stopDb = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

// wipe every collection so one test can't bleed into the next
const clearDb = async () => {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
};

module.exports = { startDb, stopDb, clearDb };
