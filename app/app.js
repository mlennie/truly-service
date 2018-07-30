require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/query', (req, res) => {

})

app.post('/number', (req, res) => {

})

var port = process.env.PORT
var host = process.env.HOST

app.listen(port, host, function() {
  console.log('Listening on port ' + port + '...')
})
