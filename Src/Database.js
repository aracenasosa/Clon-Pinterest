const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finterest', {
    useNewUrlParser: true
})
.then(db => console.log('DB is Connected'))
.catch(err => console.error(err));