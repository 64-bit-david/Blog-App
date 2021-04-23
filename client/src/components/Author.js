import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { fetchAuthorBasic, fetchUserStories, clearError, clearUserStories, dropNav, clearPagination } from '../actions';
import Pagination from './Pagination';
import displayError from './displayError';

const Author = ({ author, match, fetchUserStories, userStories, fetchAuthorBasic, pager, error, clearError, clearUserStories, dropNav, clearPagination }) => {

  const [currentPage, setCurrentPage] = useState(match.params.page);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setCurrentPage(match.params.page || 1);

  }, [setCurrentPage, match.params.page, currentPage])

  //if not author, fetch with url param
  useEffect(() => {
    if (!author) {
      fetchAuthorBasic(match.params.authorId);
    }
  }, [fetchAuthorBasic, match.params.authorId, author]);


  //fetch author stories
  useEffect(() => {
    fetchUserStories(currentPage || 1, match.params.authorId);
  }, [currentPage, match.params.authorId, fetchUserStories]);

  useEffect(() => {
    if (author) setLoading(false);
  }, [loading, author])

  useEffect(() => {
    return function cleanup() {
      clearPagination();
    }
  }, [clearPagination]);

  useEffect(() => {
    return function cleanup() {
      clearUserStories();
    }
  }, [clearUserStories]);

  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav])

  //if author has updated their username, display that instead of name from google acc
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
          <div className="header-container">
            <h1>{authorName()}</h1>
          </div>
          <p>{authorDescription()}</p>
          <Link
            to={`/payment/${author._id}`}
            className="btn green-btn"
          >Donate</Link>
          <div className="author-donations-container">
            {author.donationsRecieved ? <p>{authorName()} has received :  £{author.donationsRecieved} from other users!</p> : null}
            {author.donationsSent ? <p>{authorName()} has dontated  £{author.donationsSent} to other authors!</p> : null}

          </div>
        </div>
      )
    }
  }

  const renderAuthorStories = () => {
    if (!author) {
      return null
    }
    else if (!userStories) {
      return null;
    } else {
      return userStories.map(story => {
        return (
          <section className={`story-item-container author-story-container`} key={story._id}>
            <Link
              to={`/story/${story._id}`}
            >
              <div className="story-item">
                <h3>{story.title}</h3>
                <p className="story-page-author">Posted by: {story.username}</p>
                <p className="story-page-desc">
                  {story.description}
                </p>
              </div>
            </Link>

          </section>
        )
      })
    }
  }

  const pageSuccess = () => {
    if (loading) {
      return (
        <div className="loader loader-margin">
          <Loader type="ThreeDots" color="#ccd5ae" height={80}
            timeout={5000}
          />
        </div>)
    }
    return (
      <div className="author-page-container">
        {renderAuthorInfo()}
        <div className="header-container sub-header-container">
          {/* render depending on current page */}
          {
            <h2>{!currentPage || currentPage === 1 ? `${authorName()}'s Stories ` : `${authorName()}'s Stories - Page ${currentPage}`}</h2>}
        </div>
        <div className="stories-grid author-stories-grid">
          {renderAuthorStories()}
        </div>
        {loading ? null :
          <Pagination pager={pager} currentPage={currentPage} path={`/author/${match.params.authorId}/`} clearStore={clearUserStories} />
        }
      </div>
    )
  }

  return (
    <div>
      {error ? displayError(error, clearError) : pageSuccess()}

    </div>
  )
};

const mapStateToProps = ({ author, auth, userStories, pager, error }) => {
  return { author, auth, userStories, pager, error }
};

export default connect(mapStateToProps, { fetchAuthorBasic, fetchUserStories, clearError, clearUserStories, dropNav, clearPagination })(Author);

