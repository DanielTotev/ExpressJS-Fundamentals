const qs = require('querystring');
const Tag = require('../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let inputData = '';
    req.on('data', (data) => inputData += data);
    req.on('end', () => {
      inputData = qs.parse(inputData);
      Tag.create({
        name: inputData.tagName,
        creationDate: Date.now(),
        images: []
      }).then(() => {
        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
      })
      .catch(err => {
        console.log(err);
      })
    });
  } else {
    return true
  }
}
