const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentIdSchema = new Schema({
  isUsed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


module.exports = mongoose.model("PaymentId", paymentIdSchema);
