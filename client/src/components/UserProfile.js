import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';

const UserProfile = ({ updateUser }) => {

  const [input, setInput] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(input);

  }
  const renderInput = () => {
    return (
      <div className="forms-container">
        <form onSubmit={onSubmit}>
          <h1>Stories posted use the name attached to your Google Account. Click here to set a username instead</h1>
          <div className="add-story-input-title add-story-item-container">
            <label> Add a Username</label>
            <input
              name="title"
              value={input}
              onChange={(e => setInput(e.target.value))}
            />
          </div>
          <button className="add-story-item-container btn" type="submit">Submit</button>
        </ form>
      </div>
    )
  }

  return (
    <div className="user-profile-container">
      {renderInput()}
    </div>
  )
}


export default connect(null, { updateUser })(UserProfile)
