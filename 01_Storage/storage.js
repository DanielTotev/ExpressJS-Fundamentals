const fs = require('fs');
const FILE_PATH = './storage.json';

let data = {};

let validateKeyType = (key, reject) => {
    if (typeof key != 'string') {
        reject(new Error('Key must be a string'));
    }
};

let checkIfKeyExsists = (key, reject) => {
    if (!data.hasOwnProperty(key)) {
        reject(new Error('Non-existing key!'));
    }
};

function put(key, value) {
    return new Promise((resolve, reject) => {
        validateKeyType(key);
        if (data[key]) {
            reject(new Error('Key already exists!'));
        }
        data[key] = value;
        resolve();
    });
}

function get(key) {
    return new Promise((resolve, reject) => {
        validateKeyType(key, reject);
        checkIfKeyExsists(key, reject);
        resolve(data[key]);
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        if (Object.keys(data).length == 0) {
            reject('No elements aviable');
        }
        resolve(data);
    });
}

function update(key, value) {
    return new Promise((resolve, reject) => {
        validateKeyType(key, reject);
        checkIfKeyExsists(key, reject);
        data[key] = value;
        resolve();
    });
}

function deleteItem(key) {
    return new Promise((resolve, reject) => {
        validateKeyType(key, reject);
        checkIfKeyExsists(key, reject);
        delete data[key];
        resolve();
    });
}

function save() {
   return new Promise((resolve, reject) => {
       fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
           if(err){
               reject(err);
           }
           resolve();
       });
   });
}

function load() {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_PATH, 'utf8', (err, jsonData) => {
            if(err){
                reject(err);
            }
            data = JSON.parse(jsonData);
            resolve();
        });
    });
}

function clear() {
    return new Promise((resolve, reject) => {
        data = {};
        resolve();
    })
}

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
};