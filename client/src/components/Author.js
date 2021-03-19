import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchAuthor } from '../actions';

const Author = ({ author, fetchAuthor, match }) => {

  useEffect(() => {
    fetchAuthor(match.params.authorId);
  }, []);


  const authorName = () => {
    if (author) {
      if (author.username) {
        return author.username
      }
      return author.name;
    }
    return null;
  }

  const renderAuthorInfo = () => {
    if (!author) {
      return null
    }
    else {
      return (
        <div className="author-data-container">
          <h2>{authorName()}</h2>
          <button className="btn">Donate</button>
        </div>
      )
    }
  }

  const renderAuthorStories = () => {
    if (!author) {
      return null
    }
    else {
      return author.stories.map(story => {
        return (
          <div className="stories-grid-item" key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        )
      })
    }
  }



  return (

    <div className="author-page-container">
      {renderAuthorInfo()}
      <h4>{authorName()}'s stories</h4>
      <div className="stories-grid author-stories-grid">
        {renderAuthorStories()}
      </div>
    </div>
  )
};

const mapStateToProps = ({ author }) => {
  return { author }
};

export default connect(mapStateToProps, { fetchAuthor })(Author);
