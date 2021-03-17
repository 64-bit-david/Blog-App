const User = require('../models/User');


exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  res.send(user);
}