require('dotenv').config()
const cors = require('cors')
const express = require('express')
const csv = require('fast-csv')
const app = express()
const fileName = "interview-callerid-data.csv"

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.get('/query', (req, res) => {
  let results = []
  try {
    csv
     .fromPath(fileName)
      .on("data", function(data){
        if (data[0] === req.query.number) {
          results.push({
            name: data[2],
            number: data[0],
            context: data[1]
          })
        }
      })
      .on("end", function(){
        res.json({results: results})
      });
  } catch(error) {
    // log error event here
    res.status(400).send("There was an issue querying. Please try again soon")
  }
})

app.post('/number', (req, res) => {
  try {
    csv
     .fromPath(fileName)
      .on("data", function(data){
        if (data[0] === req.body.number &&
            data[1] === req.body.context) {
          res.status(400).send("Number with that context already exists").end();
        }
      })
      .on("end", function(){
        // Persist new number record/object here
        res.send("Number added")
      });
  } catch(error) {
    // log error event here
    res.status(400).send("There was an issue adding number. Please try again soon")
  }
})

var port = process.env.PORT
var host = process.env.HOST

app.listen(port, host, function() {
  console.log('Listening on port ' + port + '...')
})
