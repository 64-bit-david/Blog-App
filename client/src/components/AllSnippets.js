import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';

import paginationHelper from './paginationHelper';
import { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet } from '../actions';

const AllSnippets = ({ postSnippet, fetchAllSnippets, snippets, addSnippet, auth, deleteSnippet, pager, match }) => {

  const [snippetInput, setSnippetInput] = useState('');

  const [currentPage, setCurrentPage] = useState(match.params.page);


  useEffect(() => {
    setCurrentPage(match.params.page);
  });


  useEffect(() => {
    if (pager.currentPage !== currentPage) {
      fetchAllSnippets(currentPage);
    }
    else {
      fetchAllSnippets(1)
    }
  }, [currentPage]);


  const onSubmit = (e) => {
    e.preventDefault();
    postSnippet(snippetInput);
    setSnippetInput('');
  }

  const rendersnippetInput = () => {
    return (
      <form onSubmit={onSubmit} >
        <label>Post a snippet</label>
        <input
          onChange={(e) => setSnippetInput(e.target.value)}
          value={snippetInput}
          name='snippetText'
        />
      </form>
    )
  }

  const renderSnippets = () => {
    return snippets.map(snippet => {
      return (
        <div key={snippet._id} className="snippet-container">
          <p className="snippet-username">
            <Link to={`/author/${snippet._user}`}>{snippet.username}</Link></p>
          <p className="snippet-text">{snippet.text}
          </p>
          {snippet._user === auth._id ?
            <button onClick={() => deleteSnippet(snippet._id)}>Delete</button> : null}

        </div>
      )
    })
  }

  return (
    <div className="all-snippets-container">
      <h3>Snippets</h3>
      <p>A live feed of user updates</p>
      { rendersnippetInput()}
      {renderSnippets()}
      {paginationHelper(pager, currentPage, '/snippets/')}

    </div>
  )
}

const mapStateToProps = ({ snippets, auth, pager }) => {
  return { snippets, auth, pager };
}

export default connect(mapStateToProps, { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet })(AllSnippets);


