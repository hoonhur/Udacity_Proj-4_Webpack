const dotenv = require('dotenv')
dotenv.config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mockAPIResponse = require('./mockAPI.js')


const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded(false))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.sendFile('dist/index.html'))

// designates what port the app will listen to for incoming requests
app.listen(8082, () => console.log('Example app listening on port 8082!'))

const Aylien = require('aylien_textapi')

projectData = {}

const textApi = new Aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
})

const data = []

app.post('/api', (req, res) => {
    console.log("Request to 'api' endpoint", req.body.text)
    data.push(req.body)
    data['text'] = req.body.text
    textApi.sentiment({ 
        text: data.text,
        mode: 'tweet'
    }, function (error, response) {
        if (error === null) {
            projectData['polarity'] = response.polarity
            projectData['subjectivity'] = response.subjectivity
            projectData['text'] = response.text
            projectData['polarity_confidence'] = response.polarity_confidence
            projectData['subjectivity_confidence'] = response.subjectivity_confidence
            res.send(projectData)
            console.log(projectData)
        } else {
            console.log(error, 'error')
        }
        
    })
})

app.get('/projectData', (req, res) => {
    res.send(projectData)
})
