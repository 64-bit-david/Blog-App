import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { postSnippet, fetchSnippet, addSnippet, deleteSnippet, clearError, clearAuthor } from '../actions';


const Snippets = ({ postSnippet, fetchSnippet, snippets, addSnippet, auth, deleteSnippet, clearAuthor }) => {


  const { register, handleSubmit, errors, reset } = useForm();

  //fetchsnippets, and open a socket the listens for created snippets
  useEffect(() => {
    if (snippets.length < 1) {
      fetchSnippet();
      const socket = openSocket(process.env.REACT_APP_STRIPE_PATH);
      socket.on('snippets', data => {
        if (data.action === 'create') {
          addSnippet(data.snippet);
        }
        if (data.action === 'delete') {
          fetchSnippet();
        }
      })
      return () => {
        socket.off('snippets');
      }
    }
  }, [addSnippet, fetchSnippet]);



  const onSubmit = (data) => {
    postSnippet(data.snippetText);
    reset();
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

  //renders snippets
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
        <div key={snippet._id} className="snippet-container">
          <div className="snippet-left">
            <p className="snippet-text">{snippet.text}
            </p>
            <p className="snippet-username">
              <Link
                to={`/author/${snippet._user}`}
                onClick={() => clearAuthor()}>{snippet.username}</Link>
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
      <div className="snippets-container story-item">
        <div className="snippet-header-container">
          <h3>Snippets</h3>
        </div>
        <p className="snippets-sub-header">Let other writers know what you're up to, add a short snippet to the live feed.</p>
        {rendersnippetInput()}
        {renderSnippets()}
        <div className="link-to-snippets">
          <Link to="/snippets/1">See all snippets</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {pageSuccess()}
    </div>

  )
}

const mapStateToProps = ({ snippets, auth }) => {
  return { snippets, auth };
}

export default connect(mapStateToProps, { postSnippet, fetchSnippet, addSnippet, deleteSnippet, clearError, clearAuthor })(Snippets);


