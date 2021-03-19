const User = require('../models/User');
const Story = require('../models/Story');


exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId)
    .populate({ path: 'stories', model: Story });

  res.send(user);
}

exports.getUserBasic = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  res.send(user);
}

