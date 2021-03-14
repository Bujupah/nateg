const asyncHandler = require('express-async-handler')
const service = require('../services/projects')

const getAll = asyncHandler(async (req, res, next) => {
  const projects = await service.getAll()
  res.status(200).json(projects)
})

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const project = await service.getById(id)
  res.status(200).json(project)
})

const getByTitle = asyncHandler(async (req, res, next) => {
  const { title } = req.query
  const project = await service.getByTitle(title)
  res.status(200).json(project)
})

const insertOne = asyncHandler(async (req, res, next) => {
  const projects = await service.insertOne(req.body)
  res.status(200).json(projects)
})

const updateOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  console.log(req.body)
  const project = await service.updateOne(id, req.body)
  res.status(200).json(project)
})

const deleteOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const project = await service.deleteOne(id)
  res.status(200).json(project)
})

module.exports = {
  getAll,
  getById,
  getByTitle,
  insertOne,
  updateOne,
  deleteOne
}