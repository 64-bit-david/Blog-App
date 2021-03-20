import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStories } from '../actions/index';
import Snippets from './Snippets';




const Stories = ({ stories, fetchStories }) => {

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const emptyObj = {};

  //creates a new array with the object from the liveFeed function inserted at index 1
  const storiesArrayWithFeed = () => {

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
            to={`/stories/${story._id}`}
          >
            <h3>{story.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
              className="story-page-story">
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
    </div>
  )
}


const mapStateToProps = ({ stories }) => {
  return { stories }
}

export default connect(mapStateToProps, { fetchStories })(Stories);
