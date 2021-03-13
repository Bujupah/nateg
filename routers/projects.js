const express = require("express");
const router = express.Router();

const monk = require('monk')
const db = monk('mongodb+srv://nateg:nateg1234@nateg.sejry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const projects = db.get('projects')

// READ ALL
router.get('/', async (req, res) => {
  try {
    const items = await projects.find()
    res.json(items)
  } catch (error) {
    console.log(error.message)
  }
})

// READ ON BY ID
router.get('/:id', async (req, res)=> {
  let { id } = req.params
  try {
    const item = await projects.findOne({'_id': id})
    res.json(item)
  } catch (error) {
    console.log(error.message)
  }
})

// Create project 
router.post('/', async (req, res)=> {
  try {
    let project = req.body
    const item = await projects.insert(project)
    res.json(item)
  } catch (error) {
    console.log(error.message);
  }
})

// Update project
router.put('/:id', async (req, res)=> {
  let { id } = req.params

  try {
    const item = await projects.findOne({'_id': id})

    if(!item) {
      res.status(400).json({
        message: "This project does not exist"
      })
    }

    let project = req.body    
    const updated = await projects.findOneAndUpdate({'_id': id}, {$set: project})
  
    res.json(updated)
  } catch (error) {
    console.log(error.message)
  }

})

// Delete project
router.delete('/:id', async (req, res)=> {
  let { id } = req.params
  try {
    const item = await projects.findOne({'_id': id})

    if(!item) {
      res.status(400).json({
        message: "This project does not exist"
      })
    }
    
    const deleted = await projects.findOneAndDelete({'_id': id})
    res.json({
      message: "Project is deleted successfully"
    })
  } catch (error) {
    console.log(error.message)    
  }
})

module.exports = router