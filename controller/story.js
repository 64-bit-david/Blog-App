const Story = require('../models/Story');
const User = require('../models/User');

const STORIES_PER_PAGE = 5;

exports.getStories = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalStories;
  try {
    const numOfStories = await Story.find().countDocuments();
    totalStories = numOfStories;
    const stories = await Story.find()
      .sort({ _id: -1 })
      .skip((page - 1) * STORIES_PER_PAGE)
      .limit(STORIES_PER_PAGE);
    if (!stories) {
      const error = new Error('fetching stories failed');
      error.statusCode = 500;
      throw error;
    }

    const pager = {
      totalStories,
      currentPage: page,
      hasNextPage: STORIES_PER_PAGE * page < totalStories,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalStories / STORIES_PER_PAGE),
    }

    res.status(200).json({
      msg: 'Stories fetched',
      stories,
      pager
    })
  } catch (err) {
    next(err);
  }
}


exports.getStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    const story = await Story.findById(storyId);
    if (!story) {
      const error = new Error('Story not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ msg: 'Story fetched', story });
  } catch (err) {
    next(err);
  }
}

exports.addStory = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  // const sanitizedHtml = req.body.content;


  try {
    const story = new Story({
      title,
      description,
      content,
      _user: req.user._id
    });
    const user = await User.findOne(req.user._id);
    const response = await story.save();
    if (!response) {
      const error = new Error('Creating story failed');
      error.statusCode = 500;
      throw error;
    }
    if (!user.stories) {
      user.stories = { _id: story._id };
    } else {
      user.stories.push({ _id: story._id });
    }
    await user.save();
    res.status(200).json({ msg: 'Story Created', story: response });
  } catch (err) {
    next(err);
  }
}

exports.editStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const story = await Story.findById(storyId);
    if (!story) {
      const error = new Error('Story not found');
      error.statusCode = 404;
      throw error;
    }
    story.title = title;
    story.content = content;
    const updatedStory = await story.save();
    if (!updatedStory) {
      const error = new Error('Story not updated');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({ msg: "Story Updated", updatedStory })

  } catch (err) {
    next(err);
  }
}

exports.postStoryComment = async (req, res, next) => {
  const storyId = req.params.storyId;
  const userId = req.user._id;
  let username;
  const commentId = Date.now()
  req.user.username ? username = req.user.username : username = req.user.name;
  const commentText = req.body.commentText;
  const commentObj = { username, userId, commentText, id: commentId };
  try {
    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId }, { "$push": { comments: commentObj } })
    if (!updatedStory) {
      const error = new Error('Could not find story');
      error.statusCode = 500;
      throw Error;
    }

    res.status(200).json(
      { msg: 'comment added', comment: commentObj, story: updatedStory }
    );
  } catch (err) {
    next(err);
  }
}

exports.deleteStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    await Story.findByIdAndDelete(storyId);
    res.status(200).json({ msg: 'Story deleted' });
  } catch (err) {
    next(err);
  }
}