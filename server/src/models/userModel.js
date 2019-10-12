const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  id: Schema.Types.String,
  access: Schema.Types.String,
  refresh: Schema.Types.String,
  expire: Schema.Types.Date
});

module.exports = mongoose.model('User', userSchema);
