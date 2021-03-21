import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchAuthor, fetchUser, updateUser } from '../actions';

const Author = ({ author, fetchAuthor, match, auth, updateUser }) => {



  const [input, setInput] = useState('');

  const [showChangeUsername, setShowChangeUserName] = useState(false);
  const [changeContainer, setChangeContainer] = useState(false);
  const [showChangeAfterSubmit, setShowChangeAfterSubmit] = useState(false);

  useEffect(() => {
    if (!auth) {
      fetchUser();
    }
  }, [])

  useEffect(() => {
    if (!author || (author._id !== auth._id)) {
      fetchAuthor(auth._id);
    }
  }, [auth])


  const postUsernameChange = (e) => {
    e.preventDefault();
    updateUser(input);
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
    if (!author) {
      return null
    }
    else {
      return author.stories.map(story => {
        return (
          <div className="stories-grid-item" key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        )
      })
    }
  }


  const renderCurrentUser = () => {
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
          <button className="btn author-btn">Edit</button>

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
        {renderAfterChange()}

      </div>
      {renderCurrentUser()}
      <h4>Your Stories</h4>
      <div className="stories-grid author-stories-grid">
        {renderAuthorStories()}
      </div>
    </div>
  )
};

const mapStateToProps = ({ author, auth }) => {
  return { author, auth }
};

export default connect(mapStateToProps, { fetchAuthor, updateUser })(Author);

