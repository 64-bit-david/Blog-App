import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from "react-loader-spinner";

import { fetchAuthor, fetchUser, updateUsername, updateUserDesc, fetchUserStories, clearError, deleteUser, clearMessage, clearUserStories, dropNav } from '../actions';
import Pagination from './Pagination';
import displayError from './displayError';

const Author = ({ userStories, auth, updateUsername, updateUserDesc, fetchUserStories, match, pager, clearError, error, deleteUser, history, clearMessage, message, clearUserStories, dropNav }) => {


  const [loading, setLoading] = useState(true);


  const preLoadForm = {
    username: auth.username
  }

  const preLoadForm2 = {
    description: auth.description
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: preLoadForm
  });

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm({ defaultValues: preLoadForm2 });


  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav])


  // const [input, setInput] = useState('');
  const [showChangeUsername, setShowChangeUserName] = useState(false);
  const [showChangeDesc, setShowChangeDesc] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [changeContainer, setChangeContainer] = useState(false);

  const [currentPage, setCurrentPage] = useState(match.params.page);





  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [setCurrentPage, match.params.page]);

  useEffect(() => {
    if (!auth) {
      fetchUser();
    }
  }, [auth])

  useEffect(() => {
    if (auth._id) {
      fetchUserStories(currentPage || 1, auth._id);
    }
  }, [auth._id, currentPage, fetchUserStories])

  // useEffect(() => {
  //   if (auth?._id) {
  //     if (pager.currentPage !== currentPage && currentPage) {
  //       fetchUserStories(currentPage, auth._id);
  //     }
  //     else {
  //       fetchUserStories(1, auth._id);
  //     }
  //   }

  // }, [pager.currentPage, currentPage, auth, fetchUserStories]);

  useEffect(() => {
    if (userStories.length < 1) setLoading(true);
    if (userStories.length > 0) setLoading(false);
  }, [userStories.length])


  useEffect(() => {
    return function cleanup() {
      clearError();
    }
  }, [clearError])




  const postUsernameChange = (data) => {
    updateUsername(data.username);
    setShowChangeUserName(false);
  }

  const postDescChange = (data) => {
    updateUserDesc(data.description);
    setShowChangeDesc(false);
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
          <div className={`story-item-container`} key={story._id}>
            <Link
              to={`/story/${story._id}`}
            >
              <div className="story-item">
                <h3>{story.title}</h3>
                <p className="story-page-author">Posted by: {story.username}</p>
                <p className="story-page-desc">
                  {story.description}
                </p>
              </div>
            </Link>

          </div >
        )
      })
    }
  }

  const renderUserInfo = () => {
    if (auth) {
      return (
        <div className="author-data-container user-data-container">
          <div className="header-container">
            <h1>Your Profile</h1>
          </div>

          {auth.donationsRecieved || auth.donationsSent ?
            <div className="author-donations-container author-data-item">
              {auth.donationsRecieved ? <p>Donations received:  £{auth.donationsRecieved}</p> : null}
              {auth.donationsSent ? <p>You have donated: £{auth.donationsSent} </p> : null}
            </div> : null}

          <div className="author-username-container author-data-item">
            <p>{authorName()}</p>
            <button
              className="btn green-btn"
              onClick={() => {
                setShowChangeUserName(!showChangeUsername)
                setChangeContainer(!changeContainer)
              }}
            >Edit Username</button>

          </div>

          {renderChangeUsername()}

          <div className="author-description-container  author-data-item">
            <p>
              {authorDescription()}
            </p>
            <button
              className="btn green-btn"
              onClick={() => {
                setShowChangeDesc(!showChangeDesc)
                setChangeContainer(!changeContainer)
              }}>
              {auth.description ? "Edit Description" : "Add Description"}
            </button>
          </div>

          {/* renders input prompt when user clicks edit btn  */}
          {renderChangeDesc()}

          <div
            className={`author-delete-container
                      author-data-item
                      ${showDeleteUser && 'hide'}`}>
            <p>Delete your profile</p>
            <button
              className="btn danger-btn"
              onClick={() => {
                setShowDeleteUser(true)
                setChangeContainer(true)
              }}
            >DELETE</button>

          </div>
          {renderDeleteUser()}


        </div>
      )
    }
  }

  const renderChangeUsername = () => {
    if (auth) {
      return (
        <div
          className={
            `update-info-container author-data-item ${showChangeUsername && 'active'}`}>
          <button
            className="change-esc-btn btn"
            onClick={() => {
              setShowChangeUserName(false)
              setChangeContainer(false)
            }}
          >X</button>
          <form onSubmit={handleSubmit(postUsernameChange)}>
            <label>Change Username: </label>
            <div className="input-container">
              <input
                name="username"
                ref={register({ required: true, maxLength: 30 })}
              />
              <div className="submit-btn-container"><button type="submit" className="btn green-btn">Submit</button></div>
            </div>
            {errors.username && errors.username.type === 'required' && (
              <p className="validation-warning">Required</p>
            )}
            {errors.username && errors.username.type === 'maxLength' && (
              <p className="validation-warning">Username should not be longer than 30 characters</p>
            )}
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
            `update-info-container author-data-item ${showChangeDesc && 'active'}`}>
          <button
            className="change-esc-btn btn"
            onClick={() => {
              setShowChangeDesc(false)
              setChangeContainer(false)
            }}
          >X</button>
          <form onSubmit={handleSubmit2(postDescChange)}>
            <label>
              {auth.description ? 'Edit your description' :
                "Add a description to your profile"}
            </label>
            <div className="input-container">
              <input
                name="description"
                ref={register2({ required: true, minLength: 5, maxLength: 100 })}
              />
              <div className="submit-btn-container">
                <button type="submit" className="btn green-btn">Submit</button>
              </div>

            </div>
            {errors2.description && errors2.description.type === 'required' && (
              <p className="validation-warning">Required</p>
            )}
            {errors2.description && errors2.description.type === 'maxLength' && (
              <p className="validation-warning">Description should not be longer than 100 characters</p>
            )}
            {errors2.description && errors2.description.type === 'minLength' && (
              <p className="validation-warning">Descriptions must have at least 5 characters</p>
            )}
          </form>
        </div>
      )
    }
  }

  const renderDeleteUser = () => {
    return (
      <div className={
        `update-info-container author-data-item ${showDeleteUser && 'active'}`}>
        <button
          className="change-esc-btn btn"
          onClick={() => {
            setShowDeleteUser(false);
            setChangeContainer(false);
          }}
        >X</button>
        <p className="author-delete-text">Are you sure you want to delete your profile? All your data will be removed permenantly </p>
        <div className="submit-btn-container">
          <button
            className="btn danger-btn"
            onClick={() => {
              postDeleteUser();
            }}>Yes, Delete My Profile
          </button>
        </div>

      </div>
    )
  }



  const pageSuccess = () => {
    return (
      <div className="author-page-container">
        <div className={
          `change-details-bg-container ${changeContainer && 'active'} `}
        >

        </div>
        {renderUserInfo()}
        <div className="header-container sub-header-container">
          <h2>{!currentPage || currentPage === 1 ? "Your Stories" : `Your Stories - Page ${currentPage}`}</h2>
        </div>
        { loading ?
          <div className="loader loader-author">
            <Loader type="ThreeDots" color="#ccd5ae" height={80}
              timeout={5000}
            />
          </div> :
          <div className="stories-grid author-stories-grid">
            {renderAuthorStories()}
          </div>
        }
        { loading ? null :
          <Pagination
            pager={pager}
            currentPage={currentPage}
            path='/your-profile/'
            clearStore={clearUserStories} />
        }
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


};

const mapStateToProps = ({ author, auth, userStories, pager, error, message }) => {
  return { author, auth, pager, userStories, error, message }
};

export default connect(mapStateToProps, { fetchAuthor, updateUsername, updateUserDesc, fetchUserStories, clearError, deleteUser, clearMessage, clearUserStories, dropNav })(Author);

