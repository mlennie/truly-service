const cors = require('cors')
const express = require('express')
const csv = require('fast-csv')
const app = express()
const fileName = "interview-callerid-data.csv"

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.get('/query', (req, res) => {

  if (!req.query.number) {
    return res.status(400).send("Number must be present");
  }

  const patt = new RegExp(/^\+?[1-9]\d{1,14}$/);
  if (!patt.test(req.query.number)) {
    return res.status(400).send("Number format must be E.164");
  }

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
  let contextExists = false
  const { number, context, name } = req.body

  if (!name || !context || !number) {
    return res.status(400).send("Number, Context and Name must be sent");
  }

  const patt = new RegExp(/^\+?[1-9]\d{1,14}$/);
  if (!patt.test(req.body.number)) {
    return res.status(400).send("Number format must be E.164");
  }

  try {
    csv
     .fromPath(fileName)
      .on("data", function(data){
        if (data[0] === number && data[1] === context) {
          contextExists = true
        }
      })
      .on("end", function(){
        if (contextExists) {
          res.status(400).send("Number with that context already exists");
        } else {
          // Persist new number record/object here
          res.send("Number added")
        }
      });
  } catch(error) {
    // log error event here
    res.status(400).send("There was an issue adding number. Please try again soon")
  }
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, host, function() {
  console.log('Listening on port ' + port + '...')
})
