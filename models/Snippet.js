const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: '10m', default: Date.now }
});


module.exports = mongoose.model('Snippet', snippetSchema);