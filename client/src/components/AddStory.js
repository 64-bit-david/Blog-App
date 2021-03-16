import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postStory } from '../actions';


const AddStory = ({ postStory, auth }) => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [story, setStory] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    const creator = auth._id;
    const postBody = { title, description, story, creator };
    postStory(postBody)
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
              name="story"
              value={story}
              onChange={(e => setStory(e.target.value))}
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

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { postStory })(AddStory)
