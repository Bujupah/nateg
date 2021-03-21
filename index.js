const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()


const auth = require("./routes/auth")
const users = require("./routes/users")
const projects = require("./routes/projects")

const { authenticateJWT} = require('./middlewares/auth')

app.use(bodyParser.json())
app.use('/auth', auth);
app.use('/projects', authenticateJWT, projects);
app.use('/users', authenticateJWT, users);

app.use((err, req, res, next) => {
  res.status(err.status || 403).json({message: err.message})
})

app.listen(process.env.PORT, () => {
  console.log(`Listenting on ${process.env.PORT}`);
});
