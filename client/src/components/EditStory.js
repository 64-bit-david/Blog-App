import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editStory, fetchStory, clearError, dropNav } from '../actions';
import displayError from './displayError';


const EditStory = ({ story, editStory, history, match, error, dropNav }) => {


  useEffect(() => {
    if (!story) {
      fetchStory(match.params.storyId);
    }

  }, [story, match.params.storyId]);

  useEffect(() => {
    return function cleanup() {
      dropNav(false);
    }
  }, [dropNav]);

  //add story data as default value to form
  const preLoadForm = {
    title: story?.title || '',
    description: story?.description || '',
    content: story?.content || ''
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: preLoadForm
  });



  const onSubmit = (data) => {
    const storyId = match.params.storyId;
    const title = data.title;
    const description = data.description;
    const content = data.content;
    const postBody = { title, description, content, storyId };
    editStory(postBody, history);
  }



  //render forms with validation
  const forms = () => {
    return (
      <div className="forms-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="header-container">
            <h1>Edit Your Story!</h1>
          </div>
          <div className="add-story-input-title add-story-item-container">
            <label htmlFor="edit-title"> Edit Title</label>
            <input
              id="edit-title"
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
            <label htmlFor="edit-description"> Edit description</label>
            <input
              id="edit-description"
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
            <label htmlFor="edit-story">Edit Story</label>
            <textarea
              id="edit-story"
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


export default connect(mapStateToProps, { editStory, clearError, dropNav })(EditStory);
