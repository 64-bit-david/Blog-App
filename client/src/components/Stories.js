import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import displayError from './displayError';

import { fetchStories, clearError, clearMessage } from '../actions/index';
import Snippets from './Snippets';
import paginationHelper from './paginationHelper';


const Stories = ({ stories, fetchStories, pager, match, clearMessage, error, message, clearError }) => {



  const [currentPage, setCurrentPage] = useState(match.params.page);



  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [setCurrentPage, match.params.page])

  useEffect(() => {
    if (pager.currentPage !== currentPage && currentPage) {
      fetchStories(currentPage);
    }
    else {
      fetchStories(1)
    }
  }, [fetchStories, pager.currentPage, currentPage]);


  useEffect(() => {
    return function cleanup() {
      clearError();
    }
  }, [clearError])

  useEffect(() => {
    return function cleanup() {
      clearMessage()
    }
  }, [clearMessage])


  //creates a new array with the object from the liveFeed function inserted at index 1
  const storiesArrayWithFeed = () => {
    const emptyObj = {};
    const copyStories = [...stories];
    copyStories.splice(1, 0, emptyObj);
    return copyStories
  }

  //renders the array of user stories into grid items, but inserts feed component into position 1 in index 
  const renderGrid = () => {
    const storiesWithFeed = storiesArrayWithFeed();
    return storiesWithFeed.map((story, index) => {
      if (index === 1) {
        return (
          <div className={`stories-grid-item story-item `} key={index}>
            <Snippets />
          </div>
        )
      }
      return (
        <div className={`stories-grid-item story-item`} key={index}>
          <Link
            to={`/story/${story._id}`}
          >
            <h3>{story.title}</h3>
            <p className="story-page-story">
              {story.description}
            </p>
          </Link>
        </div>
      )
    })
  }

  const pageSuccess = () => {
    return (
      <div className="stories-container">
        <h1>Latest Stories</h1>
        <div className="stories-grid author-stories-grid">
          {renderGrid()}
        </div>
        {paginationHelper(pager, currentPage, '/stories/')}
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
      {/* {renderMessages()} */}
      {/* {error ? displayError(error, clearError) : pageSuccess()} */}

    </div>
  )
}


const mapStateToProps = ({ stories, pager, error, message }) => {
  return { stories, pager, error, message }
}

export default connect(mapStateToProps, { fetchStories, clearError, clearMessage })(Stories);
