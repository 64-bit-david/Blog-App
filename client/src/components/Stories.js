import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStories } from '../actions/index';
import { liveFeedArray } from './liveFeed';




const Stories = ({ stories, fetchStories }) => {

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);



  //creates a new array with the object from the liveFeed function inserted at index 1
  const storiesArrayWithFeed = () => {
    const copyStories = [...stories];
    copyStories.splice(1, 0, liveFeedArray);
    return copyStories
  }

  //renders the array of user stories into grid items. Array has the liveFeed data inserted into pos 1, so requires different conditions
  const renderGrid = () => {
    const storiesWithFeed = storiesArrayWithFeed();
    return storiesWithFeed.map((story, index) => {
      if (index === 1) {
        return (
          <div className="stories-grid-item feed-item" key={story._id}>
            <h3 className="feed-header">Snippets</h3>
            <ul>
              {story.feed.map(snippet => {
                return <li key={snippet.id}>{snippet.snippet}</li>
              })}
            </ul>
          </div>
        )
      } else {
        return (
          <div className="stories-grid-item story-item" key={story._id}>
            <Link
              to={`/stories/${story._id}`}
            >
              <h3>{story.title}</h3>
              <p>{story.content}</p>
            </Link>
          </div>
        )
      }
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
