const Story = require('../models/Story');
const User = require('../models/User');
const { validationResult } = require('express-validator');

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
      messages: 'Stories fetched',
      stories,
      pager,

    })
  } catch (err) {
    next(err);
  }
}



exports.getStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  // const storyId = "606451044a9030250c935110";

  try {
    const story = await Story.findById(storyId);
    if (!story) {
      const error = new Error('Story not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      msg: 'Story fetched',
      story,
    });
  } catch (err) {
    next(err);
  }
}

exports.addStory = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors[0].msg);
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 422;
    throw error
  }
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors[0].msg);
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 422;
    throw error
  }

  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;

  try {
    const story = await Story.findById(storyId);
    const userId = req.user._id;
    if (!story) {
      const error = new Error('Story not found');
      error.statusCode = 404;
      throw error;
    }
    console.log(story._user);
    console.log(req.user._id);
    if (story._user.toString() !== req.user._id.toString()) {
      const error = new Error("Cannot edit another user's story!");
      error.statusCode = 401;
      throw error;
    }
    story.title = title;
    story.description = description;
    story.content = content;
    const user = await User.findById(userId);
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

exports.postStoryComment = async (req, res, next) => {
  const storyId = req.params.storyId;
  const userId = req.user._id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors[0].msg);
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 422;
    throw error
  }


  let username;
  const commentId = Date.now()
  req.user.username ? username = req.user.username : username = req.user.name;
  const commentText = req.body.commentText;
  const commentObj = { username, userId, commentText, id: commentId };
  try {
    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId }, { "$push": { comments: commentObj } })
    if (!updatedStory) {
      const error = new Error('Could not update story');
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

exports.deleteComment = async (req, res, next) => {
  const storyId = req.params.storyId;
  const commentId = req.params.commentId.toString();
  try {
    const story = await Story.findById(storyId);

    commentIndex = story.comments.findIndex(comment => comment.id.toString() === commentId);
    if (story.comments[commentIndex].userId.toString() !== req.user._id.toString()) {
      const error = new Error("Cannot delete another user's comment!");
      error.statusCode = 401;
      throw error;
    }
    story.comments = story.comments.filter(comment => comment.id.toString() !== commentId);
    console.log(story.comments);
    await story.save();
    res.status(200).json({ msg: 'Comment Deleted' });
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