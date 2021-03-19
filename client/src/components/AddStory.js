import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postStory } from '../actions';
import history from 'react-router-dom';


const AddStory = ({ postStory, auth, story, history }) => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    const creator = auth._id;
    const postBody = { title, description, content, creator };
    postStory(postBody).then(() => {
      history.push('/')
    }).catch((err) => {
      console.log(err);
    })
  }



  const forms = () => {
    return (
      <div className="forms-container">
        <form onSubmit={onSubmit}>
          <h2 className="add-story-item-container">Submit Your Story!</h2>
          <div className="add-story-input-title add-story-item-container">
            <label> Add a Title</label>
            <input
              name="title"
              value={title}
              onChange={(e => setTitle(e.target.value))}
            />
          </div>
          <div className="add-story-input-description add-story-item-container">
            <label> Short description</label>
            <input
              name="description"
              value={description}
              onChange={(e => setDescription(e.target.value))}
            />

          </div>
          <div className="add-story-input-content add-story-item-container">
            <label>Story</label>
            <textarea
              name="content"
              value={content}
              onChange={(e => setContent(e.target.value))}
            />
          </div>
          <button className="add-username-btn btn" type="submit">Submit</button>
        </form>
      </div>

    )
  }

  return (
    <div className="add-story-container">
      {forms()}
    </div>
  )
}

const mapStateToProps = ({ auth, story }) => {
  return { auth, story }
}

export default connect(mapStateToProps, { postStory })(AddStory)
