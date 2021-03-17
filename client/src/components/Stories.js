import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions/index';
import { liveFeedArray } from './liveFeed';


const Stories = ({ stories, fetchStories }) => {

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);




  const storiesArrayWithFeed = () => {
    const copyStories = [...stories];
    copyStories.splice(1, 0, liveFeedArray);
    return copyStories
  }


  const renderGrid = () => {
    const storiesWithFeed = storiesArrayWithFeed();
    console.log(storiesWithFeed);
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
            <h3>{story.title}</h3>
            <p>{story.story}</p>
          </div>
        )
      }
    })
  }





  return (
    <div className="stories-container">
      <h1>Latest Stories</h1>
      <div className="stories-grid">
        {renderGrid()}
      </div>
    </div>
  )
}


const mapStateToProps = ({ stories }) => {
  return { stories }
}

export default connect(mapStateToProps, { fetchStories })(Stories);
