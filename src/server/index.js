var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded(false))
app.use(bodyParser.json())
app.use(cors())


console.log(__dirname)

app.get('/', (req, res) => res.sendFile('dist/index.html'))

// designates what port the app will listen to for incoming requests
app.listen(8080, () => console.log('Example app listening on port 8080!'))

app.get('/test', (req, res) => res.send(mockAPIResponse))
