const User = require('../models/userModel');

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.getUsers = async (role) => {
  const filter = {};
  if (role) filter.role = role;
  return await User.find(filter).select('-password');
};