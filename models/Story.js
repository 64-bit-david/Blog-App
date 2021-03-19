const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurifier = require('dompurify');
const { JSDOM } = require('jsdom');

const dompurify = createDomPurifier(new JSDOM().window);



const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  comments: {
    type: Object,
  }
}, { timestamps: true });

postSchema.pre('validate', function (next) {

  this.sanitizedHtml = dompurify.sanitize(marked(this.content));
  next();
})

module.exports = mongoose.model('Post', postSchema);