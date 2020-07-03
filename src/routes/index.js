const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uniqid = require("uniqid");

const json_books = fs.readFileSync('src/books.json','utf-8');
let books = JSON.parse(json_books);

router.get('/',(req,res)=>{
    res.render('index.ejs',{
        books
    });
});

router.get('/new-entry', (req,res)=>{
    res.render('new-entry');
});

router.post('/new-entry', (req, res)=>{
    const { title, site, description } = req.body;
    if (!title || !site || !description){
        res.status(400).send('debe llenar todos los campos..!');
        return;
    }
    let newBook = {
        id: uniqid(),
        title:title,
        site:site,
        description:description
    }
    books.push(newBook);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books,'utf-8');
    res.redirect('/');
});


router.get('/delete/:id',(req,res)=>{
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books,'utf-8');
    res.redirect('/');
});

router.get('/edit/:id',(req,res)=>{
    let Ebooks = books.filter(book => book.id === req.params.id);
    console.log(Ebooks);
    res.render('edit', {Ebooks:Ebooks[0]});
});

router.post('/edit/:id',(req,res)=>{
    const { id,title, site, description } = req.body;
    if (!title || !site || !description){
        res.status(400).send('debe llenar todos los campos..!');
        return;
    }
    books = books.filter(book => book.id != req.body.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books,'utf-8');

    let newBook = {
        id: id,
        title:title,
        site:site,
        description:description
    }
    books.push(newBook);
    const json_books2 = JSON.stringify(books)
    console.log(json_books2);
    fs.writeFileSync('src/books.json',json_books2,'utf-8');
    res.redirect('/');
});

module.exports = router;