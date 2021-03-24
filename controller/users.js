const User = require('../models/User');
const Story = require('../models/Story');

const STORIES_PER_PAGE = 4;


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
};


exports.getUserStories = async (req, res, next) => {
  const page = +req.query.page || 1;
  const userId = req.params.userId;
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

