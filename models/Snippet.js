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


// snippetSchema.pre('save', function (next) {
//   const error = new Error('Posting Snippet failed');
//   error.statusCode = 500;
//   return next(error);
// })

module.exports = mongoose.model('Snippet', snippetSchema);