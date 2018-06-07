const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');
const formidable = require('formidable');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function addImage(req, res){
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(fields);
    let imageData = {};
    imageData.url = fields.imageUrl;
    imageData.title = fields.imageTitle;
    imageData.description = fields.description;
    imageData.tags = fields.tagsID.split(',').filter(x => x.length !== 0);
    Image.create(imageData)
      .then(image => {
        Tag.update({_id: {$in: image.tags}}, {$push: {images: image._id}}, {multi: true})
          .then(() => {
            res.writeHead(302, {
              'Location': '/'
            });
            res.end();
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  })
}

function deleteImg(req, res) {
  let id = req.pathquery.id;
  Image.findOneAndRemove({_id: id})
    .then(() => {
      Tag.update({}, {$pull: {images: id}}, {multi: true})
        .then(() => {
          res.writeHead(302, {
            'Location': '/'
          });
          res.end();
        })
    })
    .catch(err => {
      console.log(err);
    })
}
