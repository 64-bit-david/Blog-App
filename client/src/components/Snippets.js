import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { postSnippet, fetchSnippet, addSnippet, deleteSnippet, clearError } from '../actions';


const Snippets = ({ postSnippet, fetchSnippet, snippets, addSnippet, auth, deleteSnippet }) => {


  const { register, handleSubmit, errors, reset } = useForm();

  //fetchsnippets, and open a socket the listens for created snippets
  useEffect(() => {
    fetchSnippet();
    const socket = openSocket('http://localhost:5000');
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
  }, [addSnippet, fetchSnippet]);



  const onSubmit = (data) => {
    postSnippet(data.snippetText);
    reset();
  }

  const rendersnippetInput = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Post a snippet</label>
        <input
          name='snippetText'
          ref={register({ required: true, maxLength: 100 })}
        />
        {errors.snippetText && errors.snippetText.type === 'required' && (
          <p>Snippet text required!</p>
        )}
        {errors.snippetText && errors.snippetText.type === 'maxLength' && (
          <p>Your snippet should be less than 100 characters</p>
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
        <div key={snippet._id}>
          <p className="snippet-username">
            <Link to={`/author/${snippet._user}`}>{snippet.username}</Link></p>
          <p className="snippet-text">{snippet.text}
            {snippet._user === auth?._id ?
              <button onClick={() => deleteSnippet(snippet._id)}>Delete</button> : null}
          </p>

        </div>
      )
    })
  }

  const pageSuccess = () => {
    return (
      <div className="snippets-container">
        <h3>Snippets</h3>
        <p>A live feed of user updates</p>
        {rendersnippetInput()}
        {renderSnippets()}
        <Link to="/snippets/1">See all snippets</Link>
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

export default connect(mapStateToProps, { postSnippet, fetchSnippet, addSnippet, deleteSnippet, clearError })(Snippets);


