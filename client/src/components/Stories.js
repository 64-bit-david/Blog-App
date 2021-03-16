import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions/index';


const Stories = ({ stories, fetchStories }) => {

  useEffect(() => {
    fetchStories();
  }, []);


  const renderPosts = () => {
    return stories.map(story => {
      return (
        <div className="stories-grid-item" key={story._id}>
          <h3>{story.title}</h3>
          <p>{story.content}</p>
        </div>
      )
    })
  }




  return (
    <div className="stories-container">
      <h1>Latest Stories</h1>
      <div className="stories-grid">
        {renderPosts()}
      </div>
    </div>
  )
}


const mapStateToProps = ({ stories }) => {
  return { stories }
}

export default connect(mapStateToProps, { fetchStories })(Stories);
