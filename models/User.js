const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  stories: [{ type: [Schema.Types.ObjectId], ref: "User" }]

  //comments?
},
  { timestamps: true });

module.exports = mongoose.model('User', userSchema);