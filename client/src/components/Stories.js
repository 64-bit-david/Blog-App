import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import displayError from './displayError';
import Loader from "react-loader-spinner";


import { fetchStories, clearError, clearMessage, clearStory, clearAuthor, clearStories, dropNav, clearPagination } from '../actions/index';
import Snippets from './Snippets';
import Pagination from './Pagination';


const Stories = ({ stories, fetchStories, pager, match, clearMessage, error, message, clearError, storeStory, clearStory, clearAuthor, clearStories, dropNav, clearPagination }) => {

  const [currentPage, setCurrentPage] = useState(match.params.page);

  const [loading, setLoading] = useState(true);

  //determines page to render
  useEffect(() => {
    setCurrentPage(match.params.page || 1);

  }, [setCurrentPage, match.params.page, currentPage])

  useEffect(() => {
    fetchStories(currentPage || 1);
  }, [currentPage, fetchStories]);

  useEffect(() => {
    if (stories.length > 0) setLoading(false);
    if (stories.length < 1) setLoading(true);
  }, [stories])


  useEffect(() => {
    return function cleanup() {
      clearError();
    }
  }, [clearError])

  useEffect(() => {
    return function cleanup() {
      clearMessage()
    }
  }, [clearMessage]);

  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav]);

  useEffect(() => {
    return function cleanup() {
      clearStories();
    }
  }, [clearStories]);

  useEffect(() => {
    return function cleanup() {
      clearPagination();
    }
  }, [clearPagination])


  //when story is clicked, check if the same story is held in store
  //if not, clear the store so new story can be fetched.
  const clearStoryCheck = (storyId, storeStoryId) => {

    if (storeStoryId && storyId !== storeStoryId) {
      clearStory();
      clearAuthor();
    }
  }

  //creates a new array with a few extras inserted at the start of the stories array
  //(featured story, title, snippets grid item)
  const storiesArrayWithFeed = () => {
    const emptyObj = {};
    const copyStories = [...stories];
    copyStories.splice(0, 0, emptyObj);
    copyStories.splice(1, 0, emptyObj);
    copyStories.splice(2, 0, emptyObj);
    return copyStories
  }

  //renders the array of user stories into grid items, insert a featured story at the index 0, snippets component at index 1 and a title for latest stories at index 2
  const renderGrid1 = () => {
    const storiesWithFeed = storiesArrayWithFeed();
    return storiesWithFeed.map((story, index) => {
      if (index === 0) {
        return (
          <section className={`story-item-container`} key={index}>
            <Link
              to={`/story/6076f50daa99aa3fc42a0d5f`}
              onClick={() => {
                clearStory();
                clearAuthor();
              }
              }
            >
              <div className="story-item featured-story">
                <h5 className="featured-text">Featured Story</h5>
                <h3>Shall I compare thee to a summer's day?</h3>
                <p className="story-page-author">Posted by: Will Shakes P</p>
                <p className="story-page-desc">
                  Thou will find 'tis the greatest poem I hath ever written. Tis about Summer and her splendid beauty. Please donate so I can buy more quills!
              </p>
              </div>
            </Link>
          </section>
        )
      }
      if (index === 1) {
        return (
          <aside className={`story-item-container snippets-container`} key={index}>
            <Snippets />
          </aside>
        )
      }
      if (index === 2) {
        return (
          <div className="story-item-container sub-header-container" key={index}>
            <h2>Latest Stories</h2>
          </div>
        )
      }
      return (
        <section className={`story-item-container`} key={index}>
          <Link
            to={`/story/${story._id}`}
            onClick={() => clearStoryCheck(story._id, storeStory?._id)}
          >
            <div className="story-item">
              <h3>{story.title}</h3>
              <p className="story-page-author">Posted by: {story.username}</p>
              <p className="story-page-desc">
                {story.description}
              </p>
            </div>
          </Link>

        </section >
      )
    })
  }

  //with pagination, if not on page one return a grid of just stories,
  //dont' need to rendr snippets/featured story
  const renderGrid2 = () => {
    return stories.map((story, index) => {
      return (
        <section className={`story-item-container`} key={index}>
          <Link
            to={`/story/${story._id}`}
            onClick={() => clearStoryCheck(story._id, storeStory?._id)}
          >
            <div className="story-item">
              <h3>{story.title}</h3>
              <p className="story-page-author">Posted by: {story.username}</p>
              <p className="story-page-desc">
                {story.description}
              </p>
            </div>
          </Link>

        </section >
      )
    })
  };
  //determines which grid to render based on current page
  const gridToRender = () => {
    if (pager.currentPage === 1) {
      return (
        <div className="stories-grid author-stories-grid">
          {renderGrid1()}
        </div>
      )
    }
    else {
      return (
        <div className="stories-grid stories-grid-2 author-stories-grid">
          {renderGrid2()}
        </div>
      )
    }
  }

  const pageSuccess = () => {
    return (
      <article className="stories-container">
        <div className="header-container">
          <h1>{!currentPage || +currentPage === 1 ? "Home" : `Latest Stories - Page ${currentPage}`}</h1>
        </div>
        <p className="p-welcome">Welcome to <span>Writer's Desk</span>, a space for creative writers to share their work! Sign up and post your own stories and consider supporting other writers with a donation.</p>
        { loading ?
          <div className="loader">
            <Loader type="ThreeDots" color="#ccd5ae" height={80}
              timeout={5000}
            />
          </div> :
          gridToRender()
        }
        {loading ? null :
          <Pagination
            pager={pager}
            currentPage={currentPage}
            path={`/stories/`}
            clearStore={clearStories}
          />
        }
      </article>
    )
  }

  //if any messages in store render them (ex. after redirect from posting success story)
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

  //render errors if any, otherwise render page.
  return (
    <div>
      {renderMessages()}
      {error ? displayError(error, clearError) : pageSuccess()}

    </div>
  )
}


const mapStateToProps = ({ stories, pager, error, message, loading, story: storeStory }) => {
  return { stories, pager, error, message, loading, storeStory }
}

export default connect(mapStateToProps, { fetchStories, clearError, clearMessage, clearStory, clearAuthor, clearStories, dropNav, clearPagination })(Stories);
