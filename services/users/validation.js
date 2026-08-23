// input checks for this service's endpoints, kept in one place
'use strict';

// every validator returns { ok: true } or { ok: false, id, message }

const validateAddUser = (body) => {
  const { id, first_name, last_name, birthday } = body;

  // id has to be there and be an actual number
  if (id === undefined || id === null) {
    return { ok: false, id: 'validation_error', message: 'id is required' };
  }
  if (typeof id !== 'number' || !Number.isFinite(id)) {
    return { ok: false, id: 'validation_error', message: 'id must be a number' };
  }
  // both names are required and can't be blank
  if (!first_name || typeof first_name !== 'string' || !first_name.trim()) {
    return { ok: false, id: 'validation_error', message: 'first_name is required' };
  }
  if (!last_name || typeof last_name !== 'string' || !last_name.trim()) {
    return { ok: false, id: 'validation_error', message: 'last_name is required' };
  }
  // birthday is required and has to be a parseable date
  if (!birthday) {
    return { ok: false, id: 'validation_error', message: 'birthday is required' };
  }
  const parsedBirthday = new Date(birthday);
  if (isNaN(parsedBirthday.getTime())) {
    return { ok: false, id: 'validation_error', message: 'birthday must be a valid date' };
  }
  // a birthday can't be in the future
  if (parsedBirthday.getTime() > Date.now()) {
    return { ok: false, id: 'validation_error', message: 'birthday cannot be in the future' };
  }
  return { ok: true };
};

const validateUserId = (param) => {
  // the id comes off the url as a string, so coerce and check it
  const id = Number(param);
  if (!Number.isFinite(id)) {
    return { ok: false, id: 'validation_error', message: 'id must be a number' };
  }
  return { ok: true, id };
};

module.exports = {
  validateAddUser,
  validateUserId,
};
