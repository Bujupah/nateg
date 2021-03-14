const createError = require("http-errors");

const monk = require("monk");
const db = monk(process.env.DB_URL);
const users = db.get("users");

const getAll = async () => {
  const items = await users.find();
  return items;
};

const getById = async (id) => {
  const item = await users.findOne({ _id: id });
  if(!item) {
    throw createError(401, 'Project does not exist!');
  }
  return item;
};

const getByName = async (name) => {
  const item = await users.findOne({ first_name: name });
  if(!item) {
    throw createError(401, 'Project does not exist!');
  }
  return item;
};

const updateOne = async (id, user) => {

  let item = await users.findOne({_id: id})

  if(!item) {
    throw createError(401, 'Project does not exist!');
  }

  item = await users.findOneAndUpdate({ _id: id }, { $set: user });
  return item;
};


module.exports = {
  getAll,
  getById,
  getByName,
  updateOne,
};
