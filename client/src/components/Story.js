import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStory, fetchAuthor, deleteStory, clearError, clearMessage } from '../actions';
import displayError from './displayError';

import StoryComments from './StoryComments';

const Story = ({ match, story, fetchStory, fetchAuthor, author, deleteStory, auth, history, clearError, error, message, clearMessage }) => {



  useEffect(() => {
    fetchStory(match.params.storyId);

  }, [fetchStory, match.params.storyId]);

  useEffect(() => {
    if (story._user) {
      fetchAuthor(story._user);
    }
  }, [story, fetchAuthor])

  useEffect(() => {
    return function cleanup() {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    return function cleanup() {
      clearMessage()
    }
  }, [clearMessage])


  const authorNameCheck = (author) => {
    if (author.username) {
      return author.username
    }
    return author.name
  }

  const onDelete = async (storyId) => {
    await deleteStory(storyId);
    history.push('/your-profile')
  }



  const renderEditOrDonate = () => {
    if (story && auth) {
      if (story._user === auth._id) {
        return (
          <div className="story-btns-container">
            <Link className="btn" to={`/edit-story/${story._id}`}>Edit</Link>
            <button
              className="btn"
              onClick={() => onDelete(story._id)}
            >delete</button>
          </div>
        )
      }
      else {
        return (
          <div className="story-btns-container">
            <p>Like the story?</p>
            <Link
              to={`/payment/${author._id}`}
              className="btn donate-btn"
            >Donate
            </Link>
          </div>
        )
      }
    }
  }

  const pageSuccess = () => {
    return (
      <div>

        {author && story ?
          <div className="story-page-container">
            <h3>{story.title}</h3>
            {renderEditOrDonate()}
            <p>{story.creator}</p>
            <p className="story-page-desc">{story.description}</p>
            <div className="story-page-grid">
              <div className="story-page-main-item grid-item">
                <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
                  className="story-page-story">
                </p>
              </div>
              <div className="story-page-sub-item grid-item">
                <div className="author-container">
                  <h4>Written By:
                   <Link to={`/author/${story._user}`}><span>{authorNameCheck(author)}</span></Link>
                  </h4>

                </div>
                <StoryComments />
              </div>
            </div>
          </div>
          : null}
      </div>


    )
  }

  const renderMessages = () => {
    if (message) {
      return (
        <div className="message-container">
          <p>{message}</p>
          <button onClick={() => clearMessage()}>Close</button>
        </div>
      )
    }
  }


  return (
    <div>
      {renderMessages()}
      {error ? displayError(error, clearError) : pageSuccess()}
    </div>
  )
}

const mapStateToProps = ({ story, author, auth, error, message }) => {
  return { story, author, auth, error, message }
}
export default connect(mapStateToProps, { fetchStory, fetchAuthor, deleteStory, clearError, clearMessage })(Story)
