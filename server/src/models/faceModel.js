const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let faceSchema = new Schema({
  data: Schema.Types.Mixed
});

module.exports = mongoose.model('Face', faceSchema);
