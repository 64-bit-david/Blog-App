import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAuthor, fetchUser, updateUsername, updateUserDesc, fetchUserStories } from '../actions';

const Author = ({ stories, author, fetchAuthor, auth, updateUsername, updateUserDesc, fetchUserStories }) => {



  const [input, setInput] = useState('');

  const [showChangeUsername, setShowChangeUserName] = useState(false);
  const [showChangeDesc, setShowChangeDesc] = useState(false);

  const [changeContainer, setChangeContainer] = useState(false);
  const [showChangeAfterSubmit, setShowChangeAfterSubmit] = useState(false);

  useEffect(() => {
    if (!auth) {
      fetchUser();
    }
  }, [])

  useEffect(() => {

    if (!author || (author._id !== auth._id)) {
      if (auth._id) {
        fetchAuthor(auth._id);
        fetchUserStories(auth._id);

      }
    }
  }, [auth])


  const postUsernameChange = (e) => {
    e.preventDefault();
    updateUsername(input);
    setInput('');
  }

  const postDescChange = (e) => {
    e.preventDefault();
    updateUserDesc(input);
    setInput('');
  }

  const authorName = () => {
    if (auth) {
      if (auth.username) {
        return auth.username
      }
      return auth.name;
    }
    return null;
  }

  const authorDescription = () => {
    if (auth) {
      if (auth.description) {
        return auth.description
      }
      else {
        return "You don't have a description yet"
      }
    }
    return null;
  }

  const renderAuthorStories = () => {
    if (!stories) {
      return null
    }
    else {
      return stories.map(story => {
        return (
          <div className="stories-grid-item" key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        )
      })
    }
  }

  const renderUserInfo = () => {
    return (
      <div className="author-data-container">
        <h2>Your Profile</h2>
        <div className="author-username-container">
          <p>Your username:
            <span>{authorName()}</span>
          </p>
          <button
            className="btn author-btn"
            onClick={() => {
              setShowChangeUserName(true)
              setChangeContainer(true)
            }}
          >Edit</button>

        </div>
        <div className="author-description-container">
          <p>Your description:
            <span>{authorDescription()}</span>
          </p>
          <button
            className="btn author-btn"
            onClick={() => {
              setShowChangeDesc(true)
              setChangeContainer(true)
            }}>
            {auth.description ? "Edit" : "Add"}
          </button>

        </div>
      </div>
    )
  }

  const renderChangeUsername = () => {
    return (
      <div
        className={
          `update-info-container ${showChangeUsername && 'active'}`}>
        <button
          className="change-esc-btn btn"
          onClick={() => {
            setShowChangeUserName(false)
            setChangeContainer(false)
          }}
        >X</button>
        <form onSubmit={postUsernameChange}>
          <label>Change Username: </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={() => {
            setShowChangeUserName(false);
            setShowChangeAfterSubmit(true);
          }} className="btn author-btn">Submit</button>
        </form>
      </div>
    )
  }


  const renderChangeDesc = () => {
    return (
      <div
        className={
          `update-info-container ${showChangeDesc && 'active'}`}>
        <button
          className="change-esc-btn btn"
          onClick={() => {
            setShowChangeDesc(false)
            setChangeContainer(false)
          }}
        >X</button>
        <form onSubmit={postDescChange}>
          <label>
            {auth.description ? 'Edit your description' :
              "Add a description to your profile"}
          </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={() => {
            setShowChangeDesc(false);
            setShowChangeAfterSubmit(true);
          }} className="btn author-btn">Submit</button>
        </form>
      </div>
    )
  }

  const renderAfterChange = () => {
    return (
      <div className={`update-info-container ${showChangeAfterSubmit && 'active'}`}>
        <button
          className="change-esc-btn btn"
          onClick={() => {
            setChangeContainer(false)
            setShowChangeAfterSubmit(false)
          }}>X</button>
        <p>Change success</p>
      </div>
    )
  }


  return (
    <div className="author-page-container">
      <div className={
        `change-details-bg-container ${changeContainer && 'active'} `}
      >
        {renderChangeUsername()}
        {renderChangeDesc()}
        {renderAfterChange()}

      </div>
      {renderUserInfo()}
      <h4>Your Stories</h4>
      <div className="stories-grid author-stories-grid">
        {renderAuthorStories()}
      </div>
    </div>
  )
};

const mapStateToProps = ({ author, auth, stories }) => {
  return { author, auth, stories }
};

export default connect(mapStateToProps, { fetchAuthor, updateUsername, updateUserDesc, fetchUserStories })(Author);

