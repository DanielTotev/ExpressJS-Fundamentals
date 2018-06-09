const Book = require('../models/Book');

module.exports.addGet = (req, res) => {
    res.render('addBook');
}

module.exports.addPost = (req, res) => {
    let title = req.body.bookTitle;
    if(!title || title === ''){
        res.render('addBook', {err: true});
        return;
    }

    let yearOfRelease = Number(req.body.bookYear);
    if(!yearOfRelease|| Number.isNaN(yearOfRelease)){
        res.render('addBook', {err: true});
        return;
    }

    let url = req.body.bookPoster;
    if(!url){
        res.render('addBook', {err: true});
        return;        
    }

    let author = req.body.bookAuthor;

    if(!author){
        res.render('addBook', {err: true});
        return;
    }

    Book.create({
        url,
        title,
        yearOfRelease,
        author
    })
    .then(book => {
        res.render('addBook', {succssess: true});        
    })
    .catch(err => {
        res.render('addBook', {err: true});        
        console.log(err);
    })
};

module.exports.viewAll = (req, res) => {
    Book.find({})
        .sort('-yearOfRelease')
        .then(books => {
            res.render('viewAll', {books: books});
        })
}

module.exports.getDetails = (req, res) => {
    let id = req.params.id.substring(1);
    Book.findById(id)
        .then(book => {
            res.render('details', {book: book});
        });
};
