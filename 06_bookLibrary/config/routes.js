const controllers = require('../controllers');

module.exports = (app) => {
    app.get('/', controllers.homeController.homeGet);

    app.get('/addBook', controllers.bookController.addGet);
    app.post('/addBook', controllers.bookController.addPost);

    app.get('/viewAllBooks', controllers.bookController.viewAll);

    app.get('/books/details/:id', controllers.bookController.getDetails);
}