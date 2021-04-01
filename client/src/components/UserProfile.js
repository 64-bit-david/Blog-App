import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAuthor, fetchUser, updateUsername, updateUserDesc, fetchUserStories, cleanUp, deleteUser } from '../actions';
import paginationHelper from './paginationHelper';
import displayError from './displayError';

const Author = ({ userStories, auth, updateUsername, updateUserDesc, fetchUserStories, match, pager, cleanUp, error, deleteUser, history }) => {



  const [input, setInput] = useState('');
  const [showChangeUsername, setShowChangeUserName] = useState(false);
  const [showChangeDesc, setShowChangeDesc] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [changeContainer, setChangeContainer] = useState(false);
  const [showChangeAfterSubmit, setShowChangeAfterSubmit] = useState(false);

  const [currentPage, setCurrentPage] = useState(match.params.page);





  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [setCurrentPage, match.params.page]);

  useEffect(() => {
    if (!auth) {
      fetchUser();
    }
  }, [auth])

  // useEffect(() => {
  //   if (auth._id) {
  //     fetchUserStories(currentPage || 1, auth._id);
  //   }
  // }, [auth, currentPage, fetchUserStories])

  useEffect(() => {
    if (auth._id) {
      if (pager.currentPage !== currentPage && currentPage) {
        fetchUserStories(currentPage, auth._id);
      }
      else {
        fetchUserStories(1, auth._id);
      }
    }

  }, [pager.currentPage, currentPage, auth, fetchUserStories]);


  useEffect(() => {
    return function cleanup() {
      cleanUp();
    }
  }, [cleanUp])


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

  const postDeleteUser = () => {
    deleteUser(auth._id, history);
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
    if (!userStories) {
      return null;
    }
    else {
      return userStories.map(story => {
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
    if (auth) {
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
          <div className="author-username-container">
            <p>Delete your profile</p>
            <button
              className="btn author-btn"
              onClick={() => {
                setShowDeleteUser(true)
                setChangeContainer(true)
              }}
            >DELETE</button>

          </div>

          <div className="author-donations-container">
            {auth.donationsRecieved ? <p>You have received :  £{auth.donationsRecieved} from other users!</p> : null}
            {auth.donationsSent ? <p>You have dontated  £{auth.donationsSent} to other authors!</p> : null}

          </div>
        </div>
      )
    }
  }

  const renderChangeUsername = () => {
    if (auth) {
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
  }


  const renderChangeDesc = () => {
    if (auth) {

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
  }

  const renderDeleteUser = () => {
    return (
      <div className={
        `update-info-container ${showDeleteUser && 'active'}`}>
        <button
          className="change-esc-btn btn"
          onClick={() => {
            setShowDeleteUser(false);
            setChangeContainer(false);
          }}
        >X</button>
        <p>Are you sure you want to delete your profile? All your data will be removed permenantly </p>
        <button onClick={() => {
          postDeleteUser();
        }}>Delete</button>

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



  const pageSuccess = () => {
    return (
      <div className="author-page-container">
        <div className={
          `change-details-bg-container ${changeContainer && 'active'} `}
        >
          {renderChangeUsername()}
          {renderChangeDesc()}
          {renderDeleteUser()}
          {renderAfterChange()}

        </div>
        {renderUserInfo()}
        <h4>Your Stories</h4>
        <div className="stories-grid author-stories-grid">
          {renderAuthorStories()}
        </div>
        {paginationHelper(pager, currentPage, '/your-profile/')}
      </div>
    )

  }

  return (
    <div>
      {error ? displayError(error, cleanUp) : pageSuccess()}
    </div>
  )


};

const mapStateToProps = ({ author, auth, userStories, pager, error }) => {
  return { author, auth, pager, userStories, error }
};

export default connect(mapStateToProps, { fetchAuthor, updateUsername, updateUserDesc, fetchUserStories, cleanUp, deleteUser })(Author);

