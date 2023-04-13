//setup express JS
const express = require('express');
const app = express();
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
    const {body, params} = req;
    const book = {
        id: books.length + 1,
        author: body.author,
        title: body.title,
    }

    books.push(book);
    return res.status(200).send({message: "New record created successfully", success: true, error: false, data: book});
})

// get request to get all the books
app.get('/', (req, res) => {
    return res.status(200).send({message: "Displaying all the data", success: true, error: false, data: books});
})

// get request with id to get a specific book
app.get('/:id', (req, res) => {
    const {body, params} = req;
    const book = books.find(book => book.id === parseInt(params.id));
    
    if(!book)
        return res.status(404).send({message: "Record not found", success: false, error: true, data: null});
    
    return res.status(200).send({message: `Book# ${params.id}`, success: true, error: false, data: book});
})

// PUT request to update the specific book
app.put('/:id', (req, res) => {
    const {body, params} = req;
    const book = books.find(book => book.id === parseInt(params.id));
    
    if(!book) 
        return res.status(404).send({message: "Record not found", success: false, error: true, data: null});
    
    book.author = body.author;
    book.title = body.title;

    return res.status(200).send({message: `Book# ${params.id} has been updated`, success: true, error: false, data: book});
})

// Delete request to delete the specific book
app.delete('/:id', (req, res) => {
    const {body, params} = req;
    const book_index = books.findIndex(book => book.id === parseInt(params.id));
    
    if(!book_index)
        return res.status(404).send({message: "Record not found", success: false, error: true, data: null});
    
    books.splice(book_index, 1);
    return res.status(200).send({message: `Record ${params.id} deleted successfully`, success: true, error: false, data: books});
})
