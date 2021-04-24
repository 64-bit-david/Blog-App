import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import openSocket from 'socket.io-client';
import Loader from 'react-loader-spinner'

import displayError from './displayError';
import Pagination from './Pagination';
import { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet, clearError, clearSnippets, dropNav, clearPagination } from '../actions';



const AllSnippets = ({ postSnippet, fetchAllSnippets, snippets, addSnippet, auth, deleteSnippet, pager, match, error, clearError, clearSnippets, history, dropNav, clearPagination }) => {


  const { register, handleSubmit, errors, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(match.params.page);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(match.params.page || 1);

  }, [setCurrentPage, match.params.page, currentPage])


  //opens/closes websocket
  useEffect(() => {
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
    fetchAllSnippets(currentPage || 1);
  }, [currentPage, fetchAllSnippets])


  useEffect(() => {
    if (snippets.length > 0) setLoading(false);
    if (snippets.length < 1) setLoading(true);
  }, [snippets]);

  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav]);

  useEffect(() => {
    return function cleanup() {
      clearPagination();
    }
  }, [clearPagination])

  //when a new snippet is posted, push user back to first page to see said snippet
  const onSubmit = (data) => {
    postSnippet(data.snippetText);
    reset();
    clearSnippets();
    history.push('/snippets/1')
  }

  //render input with validation
  const rendersnippetInput = () => {
    return (
      <form className="snippet-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlForm="add-snippet">Post a snippet</label>
        <div className="input-container">
          <input
            name='snippetText'
            id="add-snippet"
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

  //render if not logged in
  const renderSnippetAuthMsg = () => {
    return (
      <p className="snippets-sub-header">Sign in to post a snippet</p>
    )
  }

  //renders snippets component
  //When user adds a snippet, we slice the array to ensure it stays same length
  //ensure it matches the limits set in back end
  const renderSnippets = () => {
    let arrayToMap;
    if (snippets.length > 10) {
      arrayToMap = snippets.slice(0, 10);
    } else {
      arrayToMap = snippets;
    }
    return arrayToMap.map(snippet => {
      return (
        <section key={snippet._id} className="snippet-container">
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
        </section>
      )
    })
  }



  const pageSuccess = () => {
    return (
      <div className="all-snippets-container snippets-container">
        <div className="header-container snippets-header">
          <h1>All Snippets</h1>
        </div>
        <p className="snippets-sub-header">Let other writers know what you're up to, add a short snippet to the live feed.</p>
        {/* if not auth, render msg instead */}
        {!auth ? renderSnippetAuthMsg() : rendersnippetInput()}
        { loading ?
          <div className="loader loader-margin">
            <Loader type="ThreeDots" color="#ccd5ae" height={80}
              timeout={100000}
            />
          </div> :
          <div className="snippets-list">
            {renderSnippets()}
          </div>
        }
        { loading ? null :
          <Pagination pager={pager} currentPage={currentPage} path='/snippets/' clearStore={clearSnippets} />
        }

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

export default connect(mapStateToProps, { postSnippet, fetchAllSnippets, addSnippet, deleteSnippet, displayError, clearError, clearSnippets, dropNav, clearPagination })(AllSnippets);


