import React from 'react';
import { connect } from 'react-redux';
import { postStory, cleanUp } from '../actions';
import { useForm } from 'react-hook-form';
import displayError from './displayError';



const AddStory = ({ postStory, auth, history, error, cleanUp }) => {

  const { register, handleSubmit, errors } = useForm();



  const onSubmit = (data) => {
    const creator = auth._id;
    const title = data.title;
    const description = data.description;
    const content = data.content;

    const postBody = { title, description, content, creator };
    postStory(postBody, history);
  }



  const forms = () => {
    return (
      <div className="forms-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="add-story-item-container">Submit Your Story!</h2>
          <div className="add-story-input-title add-story-item-container">
            <label> Add a Title</label>
            <input
              name="title"
              ref={register({ required: true, maxLength: 100 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <p>This is required</p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p>Title should not be longer than 100 characters</p>
            )}
          </div>
          <div className="add-story-input-description add-story-item-container">
            <label> Short description</label>
            <input
              name="description"
              ref={register({ required: true, maxLength: 200 })}
            />
            {errors.description && errors.description.type === 'required' && (
              <p>Required</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p>Description should not be longer than 250 characters</p>
            )}
          </div>
          <div className="add-story-input-content add-story-item-container">
            <label>Story</label>
            <textarea
              name="content"
              ref={register({ required: true, minLength: 100, maxLength: 10000 })}
            />
            {errors.content && errors.content.type === 'required' && (
              <p>Required</p>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <p>A story must have at least 100 characters</p>)}
            {errors.content && errors.content.type === 'maxLength' && (
              <p>The maximum length for a story is 10,000 characters</p>
            )}

          </div>
          <button
            name="submit-button"
            className="add-username-btn btn"
            type="submit"
          >Submit</button>
        </form>
      </div>

    )
  }

  const pageSuccess = () => {
    return (
      <div className="add-story-container">
        {forms()}
      </div>
    )

  }

  return (
    <div>
      {error ? displayError(error, cleanUp) : pageSuccess()}
    </div>
  )
}

const mapStateToProps = ({ auth, story, error }) => {
  return { auth, story, error }
}

export default connect(mapStateToProps, { postStory, cleanUp })(AddStory)
