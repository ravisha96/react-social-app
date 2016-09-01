// get an instance of mongoose and mongoose.schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Users', new Schema({
    name: String,
    phone: {type: String, unique: true},
    password: String,
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    gender: {type: String},
    dob: {type: String},
    country: {type: String},
    ethnicity: {type: String}
}));
