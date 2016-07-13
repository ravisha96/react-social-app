// get an instance of mongoose and mongoose.schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Register', new Schema({
    firstName: String,
    lastName: String,
    middleName: String, 
    username: String,
    password: String,
    admin: Boolean
}));