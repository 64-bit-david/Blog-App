import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateStoryComments, deleteStoryComment, fetchStory } from '../actions';




const StoryComments = ({ story, updateStoryComments, auth, deleteStoryComment, fetchStory }) => {

  const { register, handleSubmit, errors, reset } = useForm();

  const [commentPage, setCommentPage] = useState(1);
  const [commentsArray, setCommentsArray] = useState(null);
  const commentsToShow = 5;



  const onSubmit = async (data) => {
    updateStoryComments(story._id, data.commentText);
    reset();
  }



  useEffect(() => {
    const createCommentPgArray = () => {
      if (story.comments) {
        const commentsToSkip = commentsToShow * (commentPage - 1);
        const arrayToRender = story.comments.slice(commentsToSkip, commentsToSkip + commentsToShow);
        setCommentsArray(arrayToRender)
      }
    }
    createCommentPgArray();

    return function cleanUp() {
      setCommentsArray(null);
    }
  }, [story, commentPage, deleteStoryComment])



  const commentPager = () => {
    let pager = {};
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
            <li key={comment.id}>
              <span className="user-comment">
                <Link to={`/author/${comment.userId}`}>{comment.username}</Link>
              </span>
              {comment.commentText}
              {comment.userId === auth._id ?
                <button
                  onClick={() => {
                    deleteStoryComment(story._id, comment.id)
                    fetchStory(story._id)
                  }
                  }
                >Delete</button> : null}
            </li>
          )
        })
      }
    }
  }

  return (
    <div className="comments-container">
      <h5>Here's what others are saying</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Add a Comment</label>
        <input
          name='commentText'
          ref={register({ required: true, maxLength: 100 })}
        />
        {errors.commentText && errors.commentText.type === 'required' && (
          <p>Snippet text required!</p>
        )}
        {errors.commentText && errors.commentText.type === 'maxLength' && (
          <p>Your snippet should be less than 100 characters</p>
        )}
        <button type="submit">Submit</button>
      </form>
      <ul>
        {renderStoryComments()}
      </ul>
      {commentPager()}
    </div>
  )
}

const mapStateToProps = ({ story, auth }) => {
  return { story, auth }
}

export default connect(mapStateToProps, { updateStoryComments, deleteStoryComment, fetchStory })(StoryComments)
