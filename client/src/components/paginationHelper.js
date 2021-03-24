import { Link } from 'react-router-dom';

export default function func(pager, currentPage, path) {
  if (pager.currentPage) {
    return (
      <div className="paginate-container">
        <ul>
          {pager.currentPage !== 1 && pager.previousPage !== 1 ?
            <li>
              <Link
                to={`${path}1`}
                className={`${currentPage === 1 && 'active'} `}
              >1
              </Link>
            </li>
            : null
          }
          {pager.hasPreviousPage ?
            <li>
              <Link to={`${path}${pager.previousPage}`}>
                {pager.previousPage}
              </Link>
            </li>
            : null
          }
          <li>
            <Link to={`${path}${pager.currentPage}`}
              className="active">
              {pager.currentPage}
            </Link>
          </li>
          {pager.hasNextPage ?
            <li>
              <Link to={`${path}${pager.nextPage}`}>
                {pager.nextPage}
              </Link>
            </li>
            : null
          }
          {pager.lastPage !== pager.currentPage &&
            pager.nextPage !== pager.lastPage &&
            pager.lastPage !== 0 ?
            <li>

              <Link to={`${path}${pager.lastPage}`}>
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
