import React from 'react'
import { Link } from 'react-router-dom';



const Pagination = ({ pager, currentPage, path, clearStore }) => {

  //Pagintion helper component, for snippets and stories

  return (
    <div className="paginate-container">
      <ul>
        {pager.currentPage !== 1 && pager.previousPage !== 1 ?
          <li>
            <Link
              to={`${path}1`}
              className={`${currentPage === 1 && 'active'} `}
              onClick={() => clearStore()}
            >1
              </Link>
          </li>
          : null
        }
        {pager.hasPreviousPage ?
          <li>
            <Link
              to={`${path}${pager.previousPage}`}
              onClick={() => clearStore()}
            >
              {pager.previousPage}
            </Link>
          </li>
          : null
        }
        <li>
          <Link to={`${path}${pager.currentPage}`}
            className="active"
            onClick={() => clearStore()}
          >
            {pager.currentPage}
          </Link>
        </li>
        {pager.hasNextPage ?
          <li>
            <Link to={`${path}${pager.nextPage}`}
              onClick={() => clearStore()}
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
              onClick={() => clearStore()}
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


export default Pagination;
