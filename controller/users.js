const User = require('../models/User');
const Story = require('../models/Story');

const STORIES_PER_PAGE = 4;


//delete this probably
//might need it for auth?
exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
      .populate({ path: 'stories', model: Story });

    res.send(user);
  } catch (err) {
    next(err);
  }
};


exports.getUserStories = async (req, res, next) => {
  const page = +req.query.page || 1;
  const userId = req.params.userId;
  console.log(userId);
  try {
    const totalStories = await Story.find({ _user: userId }).countDocuments();
    const stories = await Story.find({ _user: userId })
      .sort({ _id: -1 })
      .skip((page - 1) * STORIES_PER_PAGE)
      .limit(STORIES_PER_PAGE);

    const pager = {
      totalStories,
      currentPage: page,
      hasNextPage: STORIES_PER_PAGE * page < totalStories,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalStories / STORIES_PER_PAGE),

    }
    res.status(200).json({ msg: 'user stories fetched', stories, pager });
  } catch (err) {
    next(err);
  }



}


exports.getUserBasic = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.send(user);

  } catch (err) {
    next(err);
  }
}

exports.updateUsername = async (req, res, next) => {
  const userId = req.user._id;
  const username = req.body.username;
  try {
    let user = await User.findById(userId);
    if (!username) {
      user.username = '';
      const updatedUser = await user.save();
      return res.status(201).json({ msg: 'Username reset', user: updatedUser });
    }
    let checkUsernameExists = await User.findOne({ 'username': username })
    if (checkUsernameExists) {
      return res.status(409).json({ msg: "Username taken, please choose another" });
    }
    user.username = username;
    const updatedUser = await user.save();
    if (!updatedUser) {
      const error = new Error('Updating username failed');
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json({ msg: "Username change success", user: updatedUser });
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
    if (!updatedUser) {
      const error = new Error('Updating description failed');
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json({ msg: "Description updated", user: updatedUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Something went wrong');
      error.statusCode = 500;
      throw Error;
    }
    if (user._id.toString() !== req.user._id.toString()) {
      const error = new Error('User deletion failed - the account requested to be deleted does not match the account making the request');
      error.statusCode = 401;
      throw error;
    }
    await User.findByIdAndDelete(userId);
    res.status(201).json({ msg: 'Account Deleted' })
  } catch (err) {
    next(err)
  }

}
