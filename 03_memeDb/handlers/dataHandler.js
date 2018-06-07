const fileReader = require('../helpers/fileReader');

module.exports = (req, res) => {
    if (req.pathname === '/data' && req.method === 'GET') {
        fileReader('./db/db.json', 'application/json', res);
    } else {
        return true;
    }
};