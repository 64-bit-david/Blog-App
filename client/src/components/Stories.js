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
  })

  useEffect(() => {
    // console.log(currentPage);

    if (pager.currentPage !== currentPage) {
      fetchStories(currentPage);
    }
    else {
      fetchStories(1)
    }
  }, [currentPage]);


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
            <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
              className="story-page-story">
            </p>
          </Link>
        </div>
      )
    })
  }

  const paginationList = () => {
    if (pager.currentPage) {
      return (
        <div className="paginate-container">
          <ul>
            {pager.currentPage !== 1 && pager.previousPage !== 1 ?
              <li>
                <Link
                  to="/stories/1"
                  className={`${currentPage == 1 && 'active'} `}
                >1
                </Link>
              </li>
              : null
            }
            {pager.hasPreviousPage ?
              <li>
                <Link to={`/stories/${pager.previousPage}`}>
                  {pager.previousPage}
                </Link>
              </li>
              : null
            }
            <li>
              <Link to={`/stories/${pager.currentPage}`}
                className="active">
                {pager.currentPage}
              </Link>
            </li>
            {pager.hasNextPage ?
              <li>
                <Link to={`/stories/${pager.nextPage}`}>
                  {pager.nextPage}
                </Link>
              </li>
              : null
            }
            {pager.lastPage !== pager.currentPage &&
              pager.nextPage !== pager.lastPage &&
              pager.lastPage !== 0 ?
              <li>

                <Link to={`/stories/${pager.lastPage}`}>
                  {pager.lastPage}
                </Link>
              </li>
              : null
            }



          </ul>
        </div>
      )
    } else return;
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
