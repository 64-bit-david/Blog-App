import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStory, fetchAuthor } from '../actions';

import StoryComments from './StoryComments';

const Story = ({ match, story, fetchStory, fetchAuthor, author, auth }) => {



  useEffect(() => {
    fetchStory(match.params.storyId);
  }, [fetchStory]);

  useEffect(() => {
    if (story) {
      fetchAuthor(story._user);
    }
  }, [story])


  const authorNameCheck = (author) => {
    if (author.username) {
      return author.username
    }
    return author.name
  }



  return (
    <div>
      {author && story ?
        <div className="story-page-container">
          <h3>{story.title}</h3>
          <Link className="btn" to={`/edit-story/${story._id}`}>Edit</Link>
          <button className="btn">delete</button>

          <p>{story.creator}</p>
          <p className="story-page-desc">{story.description}</p>
          <div className="story-page-grid">
            <div className="story-page-main-item grid-item">
              <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
                className="story-page-story">
              </p>
            </div>
            <div className="story-page-sub-item grid-item">
              <div className="author-container">
                <h4>Written By:
                   <Link to={`/author/${story._user}`}><span>{authorNameCheck(author)}</span></Link>
                </h4>
                <button className="btn donate-btn">Donate</button>
              </div>
              <StoryComments />
            </div>
          </div>
        </div>
        : null}

    </div>
  )
}

const mapStateToProps = ({ story, author, auth }) => {
  return { story, author, auth }
}
export default connect(mapStateToProps, { fetchStory, fetchAuthor })(Story)
