// import data from "./data.json"

//setup express JS
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000;

// setting the server port
app.listen(port);

// using json parser
app.use(bodyParser.json());

let books = [
    {id:1, title:"LearnJs", author:"ABC"},
    {id:2, title:"LearnNode", author:"XYZ"}
]

// post request to create new books
app.post('/',  (req, res) => {
    let book = {
        id: books.length + 1,
        author: req.body.author,
        title: req.body.title,
    }

    books.push(book);
    res.status(200).send({message: "New record created successfully", success: true, error: false, data: book});
})

// get request to get all the books
app.get('/', (req, res) => {
    res.status(200).send({message: "Displaying all the data", success: true, error: false, data: books});
})

// get request with id to get a specific book
app.get('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    
    if(!book)
        res.status(404).send({message: "Record not found", success: false, error: true, data: null});
    
    res.status(200).send({message: `Book# ${req.params.id}`, success: true, error: false, data: book});
})

// PUT request to update the specific book
app.put('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    
    if(!book) 
        res.status(404).send({message: "Record not found", success: false, error: true, data: null});;
    
    book.author = req.body.author;
    book.title = req.body.title;

    res.status(200).send({message: `Book# ${req.params.id} has been updated`, success: true, error: false, data: book});
})

// Delete request to delete the specific book
app.delete('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    
    if(!book)
        res.status(404).send({message: "Record not found", success: false, error: true, data: null});
    
    const book_index = books.indexOf(book);
    books.splice(book_index, 1);
    res.status(200).send({message: `Record ${req.params.id} deleted successfully`, success: true, error: false, data: books});
})
