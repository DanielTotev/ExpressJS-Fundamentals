const fileReader = require('../helpers/fileReader');
const formidable = require('formidable');
const shortid = require('shortid');
const db = require('../config/dataBase');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    fileReader('./views/viewAll.html', 'text/html', res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    fileReader('./views/addMeme.html', 'text/html', res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    fileReader('./views/details.html', 'text/html', res);
  } else {
    return true
  }
}

// function addMeme(req, res) {
//   db.load()
//     .then(() => {
//       let imageName = shortId.generate();
//       let folder = Math.ceil(db.getDb().length / 1000);
//       //let path = `./public/images/${folder}/${imageName}`;
//       let form = new formidable.IncomingForm({uploadDir: `./public/images/${folder}`});      
//       // form.on('error', (err) => {
//       //   console.log(err);
//       //   return;
//       // }).on('fileBegin', (name, file) => {
//       //   fs.access(`./public/images/${folder}`, (err) => {
//       //     if (err) {
//       //       console.log('makingDir');
//       //       fs.mkdirSync(`./public/images/${folder}`);
//       //     }
//       //   })
//       // })
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log(files);
//         let meme = {
//           id: imageName,
//           title: fields.memeTitle,
//           memeSrc: path.normalize(files.meme.path),
//           description: fields.memeDescription,
//           privacy: fields.status,
//           dateStamp: Date.now()
//         };
//         db.add(meme);
//         db.save(() => {
//         })
//         res.writeHead(302, {
//           'Location': '/'
//         });
//         res.end();
//       });
//     });
// }
let addMeme = (req, res) => {
  let id = shortid.generate()
  let fileName = shortid.generate() + '.jpg'

  let form = new formidable.IncomingForm();

  let dirName = `./public/memeStorage/${Math.ceil(db.getDb().length / 10)}`;
  let filePathName = dirName + '/' + fileName;

  fs.access(dirName, err => {
    if (err) {
      fs.mkdirSync(dirName);
    }

    form.on('fileBegin', (name, file) => {
      file.path = filePathName;
    });

    form.parse(req, (err, fields, files) => {
      console.log(fields);
      if (err) {
        console.log(err)
        return;
      }
      let memeObject = {
        memeSrc: filePathName,
        privacy: fields.status,
        dateStamp: Date.now(),
        title: fields.memeTitle,
        description: fields.memeDescription,
        id: id
      }
      db.add(memeObject);
      db.save()
        .then(() => {
          res.writeHead(302, {
            'Location': '/'
          });
          res.end();
        });

    });
  });
}