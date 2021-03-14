const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  }
  //comments?
},
  { timestamps: true });

module.exports = mongoose.model('User', userSchema);