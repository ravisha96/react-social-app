// get an instance of mongoose and mongoose.schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Register', new Schema({
    name: String,
    email: String,
    phone: String,
    password: String
}));
