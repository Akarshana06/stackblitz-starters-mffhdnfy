const express = require('express');
const { resolve } = require('path');
const bodyParser = require ("body-parser")


const app = express();
const port = 3010;
app.use(bodyParser.json())
const students = require("./data.json")

app.use(express.static('static'));

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.json({count:0,
      students: [ ] });
  }

  const filteredStudents = students.filter(student => student.total > threshold);

   res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({ name: student.name, total: student.total }))
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});