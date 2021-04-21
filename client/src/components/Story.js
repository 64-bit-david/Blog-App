import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { fetchStory, fetchAuthor, deleteStory, clearError, clearMessage, dropNav } from '../actions';
import displayError from './displayError';

import StoryComments from './StoryComments';

const Story = ({ match, story, fetchStory, fetchAuthor, author, deleteStory, auth, history, clearError, error, message, clearMessage, dropNav }) => {

  const [deletePrompt, setDeletePrompt] = useState(false)

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!story) {
      fetchStory(match.params.storyId);
    }
  }, [story, fetchStory, match.params.storyId]);

  useEffect(() => {
    if (story && !author) {
      if (story._user) {
        fetchAuthor(story._user);
      }
    }
  }, [story, fetchAuthor, author])

  useEffect(() => {
    if (story && author) setLoading(false);
  }, [story, author, setLoading])

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

  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav])


  const authorNameCheck = (author) => {
    if (author.username) {
      return author.username
    }
    return author.name
  }

  //if user deletes story, push to user page
  const onDelete = async (storyId) => {
    await deleteStory(storyId);
    history.push('/your-profile')
  }

  //
  const renderDeletePrompt = () => {
    if (deletePrompt) {
      return (
        <div className="message-container">
          <div className="message warning-message">
            <p>Are you sure you want to delete your story?</p>
            <button
              className="btn danger-btn"
              onClick={() => onDelete(story._id)}>
              delete</button>
            <button
              className="btn change-esc-btn 
              cancel-delete-story-btn"
              onClick={() => setDeletePrompt(false)}
            >X</button>
          </div>

        </div>
      )
    }
  }

  const renderEditOrDonate = () => {
    if (story && auth) {
      if (story._user === auth._id) {
        return (
          <div className="story-edit-btns">
            <div className="story-btns-container">
              <Link className="btn green-btn" to={`/edit-story/${story._id}`}>edit</Link>
              <button
                className="btn delete-btn"
                onClick={() => setDeletePrompt(true)}
              >delete</button>
            </div>
            {renderDeletePrompt()}
          </div>
        )
      }
      else {
        return (
          <div className="story-donate-btns-container">
            <p>Like the story?</p>
            <Link
              to={`/payment/${author._id}`}
              className="btn green-btn"
            >Donate
            </Link>
          </div>
        )
      }
    }
  }

  const pageSuccess = () => {
    if (loading) {
      return (
        <div className="loader loader-margin">
          <Loader type="ThreeDots" color="#ccd5ae" height={80}
            timeout={5000}
          />
        </div>)
    }
    return (
      <div>
        {author && story ?
          <div className="story-page-container">
            <div className="header-container">
              <h1>{story.title}</h1>
            </div>
            {/* render edit or donate if auth user matches story author */}
            {renderEditOrDonate()}
            <p>{story.creator}</p>
            <p className="story-page-desc">{story.description}</p>
            <div className="author-container">
              <p>Written By:
                   <Link to={`/author/${story._user}`}>
                  <span> {authorNameCheck(author)}</span>
                </Link>
              </p>

            </div>
            <div className="story-page-grid">
              <div className="story-page-main-item grid-item">
                <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
                  className="story-page-story">
                </p>
              </div>
              <div className="story-page-sub-item grid-item">
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
          <div className="message">
            <p>{message}</p>
            <button
              className="btn notification-btn"
              onClick={() => clearMessage()}>Close</button>
          </div>
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
export default connect(mapStateToProps, { fetchStory, fetchAuthor, deleteStory, clearError, clearMessage, dropNav })(Story)
