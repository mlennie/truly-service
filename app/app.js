require('dotenv').config()
const cors = require('cors')
const express = require('express')
const csv = require('fast-csv')
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.get('/query', (req, res) => {
  let results = []
  csv
   .fromPath("interview-callerid-data.csv")
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
})

app.post('/number', (req, res) => {
  csv
   .fromPath("interview-callerid-data.csv")
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
})

var port = process.env.PORT
var host = process.env.HOST

app.listen(port, host, function() {
  console.log('Listening on port ' + port + '...')
})
