const User = require('../models/User');
const Story = require('../models/Story');


exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
      .populate({ path: 'stories', model: Story });

    res.send(user);
  } catch (err) {
    next(err);
    console.console.log(err);
  }
}

exports.getUserBasic = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  res.send(user);
}

exports.updateUsername = async (req, res, next) => {
  const userId = req.user._id;
  const username = req.body.username;
  try {
    let user = await User.findById(userId);
    user.username = username;
    const updatedUser = await user.save();
    res.status(201).json({ msg: "Profile updated", user: updatedUser });
  } catch (err) {
    console.log(err)
    next(err);
  }
}

exports.updateDesc = async (req, res, next) => {
  const userId = req.user._id;
  const desc = req.body.description;
  try {
    let user = await User.findById(userId);
    user.description = desc;
    const updatedUser = await user.save();
    res.status(201).json({ msg: "Description updated", user: updatedUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

