var mongoose = required('mongoose'),
    schema = mongoose.schema;


module.exports = mongoose.model('Chat', new Schema({
  uId: {type: Number, unique: true, required: true},
  fId: {type: Number, unique: true, required: true},
  fileId: String
}));
