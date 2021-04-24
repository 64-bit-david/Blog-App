import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner'
import { updateStoryComments, deleteStoryComment, fetchStory, clearError, clearAuthor } from '../actions';





const StoryComments = ({ story, updateStoryComments, auth, deleteStoryComment, clearAuthor }) => {

  const { register, handleSubmit, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [commentPage, setCommentPage] = useState(1);
  const [commentsArray, setCommentsArray] = useState(null);
  const commentsToShow = 5;


  const deleteComment = (storyId, commentId) => {
    deleteStoryComment(storyId, commentId)
  }

  const onSubmit = async (data) => {
    setLoading(true);
    updateStoryComments(story._id, data.commentText);
    reset();
  }


  //local pagination seperate from story/snippet pagination method
  useEffect(() => {
    const createCommentPgArray = () => {
      if (story.comments && !commentsArray) {
        story.comments.reverse();
        const commentsToSkip = commentsToShow * (commentPage - 1);
        const arrayToRender = story.comments.slice(commentsToSkip, commentsToSkip + commentsToShow);
        setCommentsArray(arrayToRender)
      }
      else if (story.comments) {
        const commentsToSkip = commentsToShow * (commentPage - 1);
        const arrayToRender = story.comments.slice(commentsToSkip, commentsToSkip + commentsToShow);
        setCommentsArray(arrayToRender)
      }
    }
    createCommentPgArray();
    setLoading(false);

    return function cleanup() {
      setCommentsArray(null);
    }
  }, [commentPage, story, setLoading]) // eslint-disable-line react-hooks/exhaustive-deps


  //local pagination
  const commentPager = () => {
    if (story.comments) {
      const numOfComments = story.comments.length
      const numOfButtons = Math.ceil(story.comments.length / commentsToShow);
      const currentPage = commentPage;
      const hasNextPage = commentsToShow * commentPage < numOfComments;
      const nextPage = commentPage + 1;
      const hasPreviousPage = commentPage > 1;
      const previousPage = commentPage - 1;
      const lastPage = numOfButtons;

      return (
        <div className="paginate-container pg-comments">
          <ul>
            {currentPage !== 1 && previousPage !== 1 ?
              <li className='comment-li'>
                <button
                  onClick={() => setCommentPage(1)}>
                  1</button>
              </li>
              : null
            }
            {hasPreviousPage ?
              <li className='comment-li'>
                <button
                  onClick={() => setCommentPage(previousPage)}>
                  {previousPage}</button>
              </li>
              : null
            }
            {
              <li className='comment-li'>
                <button
                  onClick={() => setCommentPage(currentPage)}>
                  {currentPage}</button>
              </li>
            }
            {
              hasNextPage ?
                <li className='comment-li'>
                  <button
                    onClick={() => setCommentPage(nextPage)}>
                    {nextPage}</button>
                </li>
                : null
            }
            {
              lastPage !== currentPage &&
                nextPage !== lastPage &&
                lastPage !== 0 ?
                <li className='comment-li'>
                  <button
                    onClick={() => setCommentPage(lastPage)}>
                    {lastPage}</button>
                </li>
                : null
            }
          </ul>


        </div>
      )
    }
  }

  //input with validation (adding story comment)
  const renderStoryInput = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="add-comment">Add a Comment</label>
        <div className="input-container">
          <input
            name='commentText'
            ref={register({ required: true, maxLength: 100 })}
            id="add-comment"
          />
          <button type="submit" className="btn green-btn">Post</button>
        </div>
        {errors.commentText && errors.commentText.type === 'maxLength' && (
          <p className="validation-warning">Comments have a max length of 100 characters</p>
        )}
      </form>
    )
  }

  //if user not signed in, render message instead of input
  const renderStoryInputAuthMsg = () => {
    return (
      <div><p className="story-comment-auth-msg">Sign in to post a comment</p></div>
    )
  }

  const renderStoryComments = () => {
    if (commentsArray) {
      if (commentsArray.length > 0) {
        return commentsArray.map(comment => {
          return (
            <li key={comment.id} className="comment-container">
              <div className="comment-left">
                <p className="comment-text">{comment.commentText}</p>
                <p className="comment-user">
                  <Link
                    to={`/author/${comment.userId}`}
                    onClick={() => clearAuthor()}
                  >{comment.username}</Link>
                </p>
              </div>
              <div className="comment-right">
                {comment.userId === auth._id ?
                  <button
                    onClick={() => {
                      deleteComment(story._id, comment.id);
                      setLoading(true);
                    }
                    }
                    className="btn delete-btn"
                  >Delete</button> : null}
              </div>

            </li>
          )
        })
      }
      else if (!commentsArray || commentsArray.length === 0) {
        return (
          <div className="no-comments-container">
            <p>No comments yet!</p>
          </div>
        )
      }
    }
    else {
      return (
        <div className="no-comments-container">
          <p>No comments yet!</p>
        </div>
      )
    }
  }

  return (
    <div className="comments-container">
      <div className="sub-header-container">
        <h2>Comments</h2>
      </div>
      {auth ? renderStoryInput() : renderStoryInputAuthMsg()}
      <ul className="comments-list">
        {loading ?
          <div className="loader loader-comments">
            <Loader type="ThreeDots" color="#ccd5ae" height={80}
              timeout={3000}
            />
          </div> :
          renderStoryComments()
        }
      </ul>
      {commentPager()}
    </div>
  )
}

const mapStateToProps = ({ story, auth, error }) => {
  return { story, auth, error }
}

export default connect(mapStateToProps, { updateStoryComments, deleteStoryComment, fetchStory, clearError, clearAuthor })(StoryComments)
