require('dotenv').config()
const cors = require('cors')
const express = require('express')
const csv = require('fast-csv')
const app = express()

app.use(cors())
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/query', (req, res) => {
  csv
   .fromPath("interview-callerid-data.csv")
    .on("data", function(data){
           console.log(data);
    })
    .on("end", function(){
           console.log("done");
    });

})

app.post('/number', (req, res) => {

})

var port = process.env.PORT
var host = process.env.HOST

app.listen(port, host, function() {
  console.log('Listening on port ' + port + '...')
})
