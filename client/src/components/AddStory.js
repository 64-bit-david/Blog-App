import React from 'react';
import { connect } from 'react-redux';
import { postStory, clearError } from '../actions';
import { useForm } from 'react-hook-form';
import displayError from './displayError';



const AddStory = ({ postStory, auth, history, error, clearError }) => {

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
          <div className="header-container">
            <h1>Submit Your Story!</h1>
          </div>
          <div className="form-btn-container">
            <button type="button" className="btn notification-btn">How to format</button>
          </div>
          <div className="add-story-input-title add-story-item-container">
            <label> Add a Title</label>
            <input
              name="title"
              ref={register({ required: true, maxLength: 100 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <p className="validation-warning">This is Required</p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p className="validation-warning">Title should not be longer than 100 characters</p>
            )}
          </div>
          <div className="add-story-input-description add-story-item-container">
            <label> Short description</label>
            <input
              name="description"
              ref={register({ required: true, maxLength: 200 })}
            />
            {errors.description && errors.description.type === 'required' && (
              <p className="validation-warning">This is Required</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p className="validation-warning">Description should not be longer than 250 characters</p>
            )}
          </div>
          <div className="add-story-input-content add-story-item-container">
            <label>Story</label>
            <textarea
              name="content"
              ref={register({ required: true, minLength: 100, maxLength: 10000 })}
            />
            {errors.content && errors.content.type === 'required' && (
              <p className="validation-warning">This is Required</p>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <p className="validation-warning">A story must have at least 100 characters</p>)}
            {errors.content && errors.content.type === 'maxLength' && (
              <p className="validation-warning">The maximum length for a story is 10,000 characters</p>
            )}

          </div>
          <div className="form-btn-container">
            <button
              name="submit-button"
              className="green-btn btn"
              type="submit"
            >Submit</button>
          </div>
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
      {error ? displayError(error, clearError) : pageSuccess()}
    </div>
  )
}

const mapStateToProps = ({ auth, story, error }) => {
  return { auth, story, error }
}

export default connect(mapStateToProps, { postStory, clearError })(AddStory)
