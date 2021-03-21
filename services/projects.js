const createError = require("http-errors");

const monk = require("monk");
const db = monk(process.env.DB_URL);
const projects = db.get("projects");

const getAll = async () => {
  const items = await projects.find();
  return items;
};

const getById = async (id) => {
  const item = await projects.findOne({ _id: id });
  if(!item) {
    throw createError(401, 'Project does not exist!');
  }
  return item;
};

const getByTitle = async (title) => {
  const item = await projects.findOne({ title });
  return item;
};

const insertOne = async (project) => {
  const item = await projects.insert(project);
  return item;
};

const updateOne = async (id, project) => {
  let item = await projects.findOne({_id: id})
  if(!item) {
    throw createError(401, 'Project does not exist!');
  }
  item = await projects.findOneAndUpdate({ _id: id }, { $set: project });
  return item;
};

const deleteOne = async (id) => {
  const item = await projects.findOneAndDelete({ _id: id });
  if(!item) {
    throw createError(401, 'Project does not exist!');
  }
  return item;
};

module.exports = {
  getAll,
  getById,
  getByTitle,
  insertOne,
  updateOne,
  deleteOne,
};
