import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStoryComments } from '../actions';




const StoryComments = ({ story, updateStoryComments }) => {

  const [commentInput, setCommentInput] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    updateStoryComments(story._id, commentInput);
    setCommentInput('');
  }

  const renderStoryComments = () => {
    if (story.comments) {
      return story.comments.map(comment => {
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
    </div>
  )
}

const mapStateToProps = ({ story }) => {
  return { story }
}

export default connect(mapStateToProps, { updateStoryComments })(StoryComments)
