const asyncHandler = require('express-async-handler')
const service = require('../services/users')

const getAll = asyncHandler(async (req, res, next) => {
  const users = await service.getAll()
  res.status(200).json(users)
})

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const user = await service.getById(id)
  res.status(200).json(user)
})

const getByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query
  const user = await service.getByName(name)
  res.status(200).json(user)
})

const updateOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const project = await service.updateOne(id, req.body)
  res.status(200).json(project)
})

module.exports = {
  getAll,
  getById,
  getByName,
  updateOne,
}