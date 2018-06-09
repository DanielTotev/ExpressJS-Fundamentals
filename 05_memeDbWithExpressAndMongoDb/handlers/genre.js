const Genre = require('../models/Genre');

module.exports.addGet = (req, res) => {
    res.render('addGenre');
}

module.exports.addPost = (req, res) => {
    Genre.create({
        genreName: req.body.title
    }).then(genre => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        return;
    });
}