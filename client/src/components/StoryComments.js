import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStoryComments } from '../actions';




const StoryComments = ({ story, updateStoryComments }) => {

  const [commentInput, setCommentInput] = useState('');
  const [commentPage, setCommentPage] = useState(5);
  const commentsToShow = 5;


  const onSubmit = async (e) => {
    e.preventDefault();
    updateStoryComments(story._id, commentInput);
    setCommentInput('');
  }

  const commentPaginatedArray = () => {
    if (story.comments) {
      const numOfComments = story.comments.length;
      const commentsToSkip = commentsToShow * (commentPage - 1);
      const arrayToRender = story.comments.slice(commentsToSkip, commentsToSkip + commentsToShow);
      return arrayToRender;
    }
  }

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
    const paginatedArray = commentPaginatedArray();
    console.log(paginatedArray);
    return paginatedArray.map(comment => {
      return (
        <li key={comment.id}>
          <span className="user-comment">
            <Link to={`/author/${comment.userId}`}>{comment.username}</Link>
          </span>
          {comment.commentText}
        </li>
      )
    })
  }

  return (
    <div className="comments-container">
      <h5>Here's what others are saying</h5>
      <form onSubmit={onSubmit}>
        <label>Add a Comment</label>
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {renderStoryComments()}
      </ul>
      {commentPager()}
    </div>
  )
}

const mapStateToProps = ({ story }) => {
  return { story }
}

export default connect(mapStateToProps, { updateStoryComments })(StoryComments)
