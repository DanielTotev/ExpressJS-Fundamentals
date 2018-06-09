const handlers = require('../handlers');


module.exports = (app) => {
    app.get('/', handlers.homeHandler);

    app.get('/addMeme', handlers.memeHandler.addGet);
    app.post('/addMeme', handlers.memeHandler.addPost);

    app.get('/addGenre', handlers.genreHandler.addGet);
    app.post('/addGenre', handlers.genreHandler.addPost);

    app.get('/viewAllMemes', handlers.memeHandler.viewAll);
    
    app.get('/getDetails:id', handlers.memeHandler.detailsGet);

    app.get('/searchMeme', handlers.memeHandler.searchGet);
    app.post('/searchMeme', handlers.memeHandler.searchPost);

    app.get('*', (req, res) => {
        res.send('404 Not Found!');
    })
};