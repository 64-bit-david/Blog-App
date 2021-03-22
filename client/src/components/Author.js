import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchAuthor } from '../actions';

const Author = ({ author, fetchAuthor, match, }) => {

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

  const authorDescription = () => {
    if (author) {
      if (author.description) {
        return author.description
      }
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
          <p>{authorDescription()}</p>
          <button className="btn">Donate</button>
        </div>
      )
    }
  }

  const renderAuthorStories = () => {
    if (!author) {
      return null
    }
    else if (!author.stories) {
      return null;
    } else {
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
      <div className="stories-grid author-stories-grid">
        {renderAuthorStories()}
      </div>
    </div>
  )
};

const mapStateToProps = ({ author, auth }) => {
  return { author, auth }
};

export default connect(mapStateToProps, { fetchAuthor })(Author);

