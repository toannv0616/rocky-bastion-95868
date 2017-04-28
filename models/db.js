var initDatabaseConnection = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var dbURI;
    if (process.env.NODE_ENV === 'production') {
        dbURI = process.env.dbURI;
    } else {
        dbURI = 'mongodb://localhost/facebook';
    }
    mongoose.connect(dbURI, function (err) {
        if (err) throw err;
        console.log('Connected to database');
    });
};

module.exports = initDatabaseConnection();
