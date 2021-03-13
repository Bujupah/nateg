const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const projects = require("./routers/projects")

app.use(bodyParser.json())
app.use('/projects', projects);

app.listen(3000, () => {
  console.log("Listenting on 3000");
});
