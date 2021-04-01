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
  description: {
    type: String,
  },
  stories: [{ type: [Schema.Types.ObjectId], ref: "User" }],
  donationsRecieved: {
    type: Number,
  },
  donationsSent: {
    type: Number,
  }

  //comments?
},
  { timestamps: true });


// userSchema.pre('save', function (next) {
//   const error = new Error('Saving user failed');
//   error.statusCode = 500;
//   return next(error);
// })

module.exports = mongoose.model('User', userSchema);