var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    admin: Boolean
}));