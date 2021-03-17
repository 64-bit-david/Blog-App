import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStory, fetchAuthor } from '../actions';

const Story = ({ match, story, fetchStory, fetchAuthor, author }) => {


  useEffect(() => {
    fetchStory(match.params.post);
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
          <p>{story.creator}</p>
          <p className="story-page-desc">{story.description}</p>
          <div className="story-page-grid">
            <div className="story-page-main-item grid-item">
              <p className="story-page-story">{story.story}</p>
            </div>
            <div className="story-page-sub-item grid-item">
              <div className="author-container">
                <h4>Written By: {authorNameCheck(author)}</h4>
                <button class="btn donate-btn">Donate</button>
              </div>
              <div className="comments-container">
                <h5>Here's what others are saying</h5>
                <ul>
                  <li><span className="user-comment">Random User</span>This is great! Love the flow of it</li>
                  <li><span className="user-comment">Random User</span><span>Hopefully you get the next one out quick</span></li>
                  <li><span className="user-comment">Random User</span><span>Love your work. Donated another few bucks!</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        : null}

    </div>
  )
}

const mapStateToProps = ({ story, author }) => {
  return { story, author }
}
export default connect(mapStateToProps, { fetchStory, fetchAuthor })(Story)
