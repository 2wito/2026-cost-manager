// reads the .env file and hands this service the values it needs
'use strict';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// bail out immediately if we can't reach the database
const missing = ['MONGO_URI'].filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  // the host gives us a single PORT in production; locally we use one per service
  PORT_ABOUT: parseInt(process.env.PORT, 10) || parseInt(process.env.PORT_ABOUT, 10) || 3004,
  // kept as a JSON string in .env so it never has to live in the database
  TEAM_MEMBERS: JSON.parse(process.env.TEAM_MEMBERS || '[]'),
};
