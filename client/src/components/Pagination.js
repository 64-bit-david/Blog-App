import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearStories } from '../actions';



const Pagination = ({ pager, currentPage, path, clearStories }) => {

  return (
    <div className="paginate-container">
      <ul>
        {pager.currentPage !== 1 && pager.previousPage !== 1 ?
          <li>
            <Link
              to={`${path}1`}
              className={`${currentPage === 1 && 'active'} `}
              onClick={() => clearStories()}
            >1
              </Link>
          </li>
          : null
        }
        {pager.hasPreviousPage ?
          <li>
            <Link
              to={`${path}${pager.previousPage}`}
              onClick={() => clearStories()}
            >
              {pager.previousPage}
            </Link>
          </li>
          : null
        }
        <li>
          <Link to={`${path}${pager.currentPage}`}
            className="active"
            onClick={() => clearStories()}
          >
            {pager.currentPage}
          </Link>
        </li>
        {pager.hasNextPage ?
          <li>
            <Link to={`${path}${pager.nextPage}`}
              onClick={() => clearStories()}
            >
              {pager.nextPage}
            </Link>
          </li>
          : null
        }
        {pager.lastPage !== pager.currentPage &&
          pager.nextPage !== pager.lastPage &&
          pager.lastPage !== 0 ?
          <li>

            <Link to={`${path}${pager.lastPage}`}
              onClick={() => clearStories()}
            >
              {pager.lastPage}
            </Link>
          </li>
          : null
        }
      </ul>
    </div>
  )

}


export default connect(null, { clearStories })(Pagination);
