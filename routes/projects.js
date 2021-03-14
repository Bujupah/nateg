const express = require("express")
const controller = require('../controllers/projects')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.insertOne)
router.put('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router