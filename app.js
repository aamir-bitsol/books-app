// import "./data.json"

//setup express JS
const express = require('express')
const app = express()
const bodyParser = require("body-parser");

// using json parser
app.use(bodyParser.json());


let books = [
    {id:1, title:"LearnJs", author:"ABC"},
    {id:2, title:"LearnNode", author:"XYZ"}
]

app.post('/',  (req, res) => {
    app.use('/', express.static('view'))

    book = {
        id: books.length + 1,
        author: req.body.author,
        title: req.body.title,
    }

    books.push(book);
    res.send(books[books.length -1]);
})

app.get('/', (req, res) => {
    res.send(books);
})

app.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if(!book){
        res.send("Book not found with given ID").status(404);
    }
    
    res.send(book).status(200)
})

app.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if(!book){
        res.send("Book not found with given ID").status(404);
    }

    book.author = req.body.author;
    book.title = req.body.title;

    res.send("Record has been updated successfully").status(200);
})

app.delete('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if(!book){
        res.send("Book not found with given ID").status(404);
    }
    
    const book_index = books.indexOf(book);
    books.splice(book, 1);
    res.send("Record has been deleted successfully").status(200);
})

app.listen(3000);
