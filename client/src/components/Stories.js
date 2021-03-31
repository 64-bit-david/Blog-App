import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import displayError from './displayError';

import { fetchStories, cleanUp } from '../actions/index';
import Snippets from './Snippets';
import paginationHelper from './paginationHelper';


const Stories = ({ stories, fetchStories, pager, match, cleanUp, error }) => {



  const [currentPage, setCurrentPage] = useState(match.params.page);



  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [setCurrentPage, match.params.page])

  useEffect(() => {
    if (pager.currentPage !== currentPage) {
      fetchStories(currentPage);
    }
    else {
      fetchStories(1)
    }
  }, [fetchStories, pager.currentPage, currentPage]);


  useEffect(() => {
    return function cleanup() {
      cleanUp();
    }
  }, [])


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


  return (
    <div>
      {error ? displayError(error, cleanUp) : null}
      <div className="stories-container">
        <h1>Latest Stories</h1>
        <div className="stories-grid author-stories-grid">
          {renderGrid()}
        </div>
        {paginationHelper(pager, currentPage, '/stories/')}
      </div>
    </div>
  )
}


const mapStateToProps = ({ stories, pager, error }) => {
  return { stories, pager, error }
}

export default connect(mapStateToProps, { fetchStories, cleanUp })(Stories);
