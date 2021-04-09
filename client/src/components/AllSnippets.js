import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import openSocket from 'socket.io-client';

import displayError from './displayError';
import Pagination from './Pagination';
import { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet, clearError } from '../actions';



const AllSnippets = ({ postSnippet, fetchAllSnippets, snippets, addSnippet, auth, deleteSnippet, pager, match, error, clearError }) => {


  const { register, handleSubmit, errors } = useForm();
  const [currentPage, setCurrentPage] = useState(match.params.page);


  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [match.params.page]);


  useEffect(() => {
    fetchAllSnippets(1)
    const socket = openSocket(process.env.REACT_APP_STRIPE_PATH);
    socket.on('snippets', data => {
      if (data.action === 'create') {
        addSnippet(data.snippet);
      }
      if (data.action === 'delete') {
        fetchAllSnippets();
      }
    })

    return () => {
      socket.off('snippets');
    }

  }, [fetchAllSnippets, addSnippet]);

  useEffect(() => {
    if (pager.currentPage !== currentPage) {
      fetchAllSnippets(currentPage);
    }
  }, [currentPage, fetchAllSnippets, pager.currentPage])


  const onSubmit = (data) => {
    postSnippet(data.snippetText);
  }

  const rendersnippetInput = () => {
    return (
      <form className="snippet-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Post a snippet</label>
        <div className="input-container">
          <input
            name='snippetText'
            ref={register({ required: true, maxLength: 100 })}
            className="snippets-home-input"
          />
          <div className="snippet-btn-container">
            <button className="btn green-btn" type='submit'>Post</button>
          </div>
        </div>
        {errors.snippetText && errors.snippetText.type === 'maxLength' && (
          <p className="validation-warning">Snippets have a max length of 100 characters</p>
        )}

      </form>
    )
  }

  //renders snippets component
  //When user adds a snippet, we slice the array to ensure it stays same length
  //ensure it matches the limits set in back end
  const renderSnippets = () => {
    let arrayToMap;
    if (snippets.length > 5) {
      arrayToMap = snippets.slice(0, 5);
    } else {
      arrayToMap = snippets;
    }
    return arrayToMap.map(snippet => {
      return (
        <div key={snippet._id} className="snippet-container">
          <div className="snippet-left">
            <p className="snippet-text">{snippet.text}
            </p>
            <p className="snippet-username">
              <Link to={`/author/${snippet._user}`}>{snippet.username}</Link>
            </p>
          </div>
          <div className="snippet-right">
            {snippet._user === auth?._id ?
              <button className="btn delete-btn" onClick={() => deleteSnippet(snippet._id)}>Delete</button> : null}
          </div>
        </div>
      )
    })
  }


  const pageSuccess = () => {
    return (
      <div className="all-snippets-container snippets-container">
        <div className="header-container snippets-header">
          <h1>Snippets</h1>
        </div>
        <p className="snippets-sub-header">Let other writers know what you're up to, add a short snippet to the live feed.</p>
        { rendersnippetInput()}
        <div className="snippets-list">
          {renderSnippets()}
        </div>
        {/* {paginationHelper(pager, currentPage, '/snippets/')} */}

      </div>
    )
  }

  return (
    <div>
      {error ? displayError(error, clearError) : pageSuccess()}
    </div>
  )
}

const mapStateToProps = ({ snippets, auth, pager, error }) => {
  return { snippets, auth, pager, error };
}

export default connect(mapStateToProps, { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet, displayError, clearError })(AllSnippets);


