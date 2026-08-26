// brings the database to the exact state required for submission: every
// costs document gone, and the users collection holding nothing but the one
// mandated test user (id 123123 / mosh / israeli — spelled and cased exactly
// as the course spec requires, do not "prettify" this).
'use strict';

require('../services/costs/env');
const { connect, disconnect } = require('../services/costs/db');
const User = require('../services/costs/models/user');
const Cost = require('../services/costs/models/cost');

// the one document the spec allows to remain in the users collection
const SEED_USER = {
  id:         123123,
  first_name: 'mosh',
  last_name:  'israeli',
  birthday:   new Date('1990-01-01T00:00:00.000Z'),
};

const run = async () => {
  await connect();

  // wipe every cost — the spec wants an otherwise-empty database
  const { deletedCount: costsRemoved } = await Cost.deleteMany({});

  // reset users down to just the one mandated document
  await User.deleteMany({});
  await User.create(SEED_USER);

  console.log(`Reset complete: removed ${costsRemoved} cost(s), users now holds only id ${SEED_USER.id}`);

  await disconnect();
};

run().catch((err) => {
  console.error('Reset failed:', err.message);
  process.exit(1);
});
