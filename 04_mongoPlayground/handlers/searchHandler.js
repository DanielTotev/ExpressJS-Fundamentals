const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');
const fs = require('fs');
const mongoose = require('mongoose');



let distinctArray = (arr) => {
  let res = [];
  let ids = [];
  for (let el of arr) {
    if (ids.includes(el._id)) {
      continue;
    }
    res.push(el);
    ids.push(el._id);
  }

  return res;
}

let printImages = (images, data, res) => {
  let replacement = '';
  for (let image of images) {
    replacement += `<fieldset id => <legend>${image.title}:</legend> 
    <img src="${image.url}">
    </img><p>${image.description}<p/>
    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
    </button> 
    </fieldset>
    `;
  }
  data = data.replace("<div class='replaceMe'></div>", replacement);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
}

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let tagSelector = {};
      if (req.pathquery.tagName !== 'Write tags separted by ,') {
        let tagNames = req.pathquery.tagName.split(',').filter(x => x !== '');
        tagSelector = {name: {$in: tagNames}};
      }

      Tag.find(tagSelector)
        .populate('images')
        .select('images')
        .then(imageData => {
          let images = [];
          imageData = imageData.map(x => x.images);
          imageData.forEach(x => {
            images = images.concat(x)
          });
          images = distinctArray(images);
          images = images.sort((a, b) => b.creationDate - a.creationDate);
          
          if(req.pathquery.beforeDate !== ''){
            let beforeDate = Date.parse(req.pathquery.beforeDate);
            images = images.filter(x => x.creationDate < beforeDate);
          }

          
          if(req.pathquery.afterDate !== ''){
            let afterDate = Date.parse(req.pathquery.afterDate);
            images = images.filter(x => x.creationDate > afterDate);
          }

          if(req.pathquery.Limit !== ''){
            let limit = Number(req.pathquery.Limit);
            images = images.slice(0, limit);
          }
          //imageData = imageData.filter((el, index) => !imageData.includes(el, index +1))
          printImages(images, data, res);
        })
    });
  } else {
    return true
  }
}
