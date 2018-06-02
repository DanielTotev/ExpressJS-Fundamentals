const storage = require('./storage');

storage.load()
    .then(() => {
        storage.clear()
            .then(() => {
                storage.getAll()
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
                    
            });
    });

// storage.put('England', 'London')
//     .then(() => {
//         storage.save().then(() => {
//             storage.getAll()
//                 .then(data => {
//                     console.log(data);
//                 });
//         });
//     });
