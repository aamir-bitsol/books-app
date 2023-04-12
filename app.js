// import "./data.json"

const express = require('express')
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', "ejs")



app.post('/',  (req, res) => {
    app.use('/', express.static('view'))
    response={
        Author: req.body.Author,
        Title: req.body.Title,
    }
    res.send(response);
})

app.get('/', (req, res) => {
    res.send('get req')
})

app.get('/:id', (req, res) => {
    res.send('get req')
})

app.put('/:id', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/:id', (req, res) => {
    res.send('Got a DELETE request at /del')
})

app.listen(3000);
