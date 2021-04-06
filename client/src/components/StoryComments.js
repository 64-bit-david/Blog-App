import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateStoryComments, deleteStoryComment, fetchStory, clearError } from '../actions';




const StoryComments = ({ story, updateStoryComments, auth, deleteStoryComment, fetchStory, error, clearError }) => {

  const { register, handleSubmit, errors, reset } = useForm();

  const [commentPage, setCommentPage] = useState(1);
  const [commentsArray, setCommentsArray] = useState(null);
  const commentsToShow = 5;


  const deleteComment = (storyId, commentId) => {
    deleteStoryComment(storyId, commentId)
  }

  const onSubmit = async (data) => {
    updateStoryComments(story._id, data.commentText);
    reset();
  }



  useEffect(() => {
    const createCommentPgArray = () => {
      if (story.comments) {
        story.comments.reverse();
        const commentsToSkip = commentsToShow * (commentPage - 1);
        const arrayToRender = story.comments.slice(commentsToSkip, commentsToSkip + commentsToShow);
        setCommentsArray(arrayToRender)
      }
    }
    createCommentPgArray();

    return function cleanup() {
      setCommentsArray(null);
    }
  }, [commentPage, story])



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

  const renderStoryComments = () => {
    if (commentsArray) {
      if (commentsArray.length > 0) {
        return commentsArray.map(comment => {
          return (
            <li key={comment.id} className="comment-container">
              <div className="comment-left">
                <p className="comment-text">{comment.commentText}</p>
                <p className="comment-user">
                  <Link to={`/author/${comment.userId}`}>{comment.username}</Link>
                </p>
              </div>
              <div className="comment-right">
                {comment.userId === auth._id ?
                  <button
                    onClick={() => deleteComment(story._id, comment.id)}
                    className="btn delete-btn"
                  >Delete</button> : null}
              </div>

            </li>
          )
        })
      } else {
        return (
          <div className="no-comments-container">
            <p>No comments yet!</p>
          </div>

        )
      }
    }
  }

  return (
    <div className="comments-container">
      <h5>Comments</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Add a Comment</label>
        <div className="input-container">
          <input
            name='commentText'
            ref={register({ required: true, maxLength: 100 })}
          />
          <button type="submit" className="btn green-btn">Post</button>
        </div>
        {errors.commentText && errors.commentText.type === 'maxLength' && (
          <p className="validation-warning">Comments have a max length of 100 characters</p>
        )}
      </form>
      <ul>
        {renderStoryComments()}
      </ul>
      {commentPager()}
    </div>
  )
}

const mapStateToProps = ({ story, auth, error }) => {
  return { story, auth, error }
}

export default connect(mapStateToProps, { updateStoryComments, deleteStoryComment, fetchStory, clearError })(StoryComments)
