const Genre = require('../models/Genre');
const Meme = require('../models/Meme');
const shortId = require('shortid');
const path = require('path');

module.exports.addGet = (req, res) => {
    Genre.find({})
        .then(genres => {
            res.render('addMeme', { genres: genres });
        });
};

//Add user messaging system
module.exports.addPost = (req, res) => {
    //console.log(req.file);
    console.log(req.body);
    let genre = req.body.genreSelect;
    let image = req.files.meme;
    let memeId = shortId.generate();
    let shortPath = `/public/images/${memeId}.jpg`;
    Genre.findOne({ genreName: genre })
        .then(genre => {
            if (!genre) {
                res.redirect('/addMeme');
            }

            image.mv(path.join(__dirname, `../${shortPath}`), (err => {
                if (err) {
                    console.log(err);
                }
                Meme.create({
                    memeSrc: shortPath,
                    description: req.body.memeDescription,
                    title: req.body.memeTitle,
                    isPrivate: req.body.status !== 'on'
                })
                    .then(memeObject => {
                        genre.memeList.push(memeObject._id);
                        genre.save()
                            .then(g => {
                                res.redirect('/');
                            })
                    })
            }))
        })
        .catch(err => {
            console.log(err);
        })
    console.log(req.files);
};

module.exports.viewAll = (req, res) => {
    Meme.find({})
        .then(memes => {
            res.render('viewAll', { memes: memes });
        });
};

module.exports.detailsGet = (req, res) => {
    let id = req.params.id.substring(1);
    Meme.findById(id)
        .then(meme => {
            res.render('details', { meme: meme });
        });
};

module.exports.searchGet = (req, res) => {
    Genre.find({})
        .then(genres => {
            res.render('searchMeme', { genres: genres });
        });
};

module.exports.searchPost = (req, res) => {
    let memeTitle = req.body.memeTitle;
    let genreName = req.body.genreSelect;

    Genre.findOne({ genreName: genreName })
        .populate('memeList')
        .select('memeList')
        .then(memes => {
            memes = memes.memeList;
            let meme = memes.filter(x => x.title === memeTitle)[0];
            if (meme) {
                res.render('details', { meme: meme });
            } else {
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })
};