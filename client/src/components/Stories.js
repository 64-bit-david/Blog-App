import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStories } from '../actions/index';
import Snippets from './Snippets';
import paginationHelper from './paginationHelper';




const Stories = ({ stories, fetchStories, pager, match }) => {



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
    <div className="stories-container">
      <h1>Latest Stories</h1>
      <div className="stories-grid author-stories-grid">
        {renderGrid()}
      </div>
      {paginationHelper(pager, currentPage, '/stories/')}
    </div>
  )
}


const mapStateToProps = ({ stories, pager }) => {
  return { stories, pager }
}

export default connect(mapStateToProps, { fetchStories })(Stories);
