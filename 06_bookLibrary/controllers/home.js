const Book = require('../models/Book');

module.exports.homeGet = (req, res) => {
    Book.find({})
        .then(books => {
            res.render('index', {bookCount: books.length});
        });
}