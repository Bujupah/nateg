const express = require("express")
const controller = require('../controllers/users')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.get('/name/:name', controller.getByName)
router.put('/:id', controller.updateOne)
// router.post('/disable', controller.disableOne)

module.exports = router
