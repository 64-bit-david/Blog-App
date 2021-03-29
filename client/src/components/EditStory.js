import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editStory, fetchStory } from '../actions';


const EditStory = ({ auth, story, editStory, history, match }) => {

  useEffect(() => {
    if (!story) {
      fetchStory(match.params.storyId);
    }

  }, [story, match.params.storyId])

  const preLoadForm = {
    title: story.title,
    description: story.description,
    content: story.content
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
    editStory(postBody)
      .then(() => {
        history.push('/story/' + storyId);
      }).catch((err) => {
        console.log(err);
      })
  }



  const forms = () => {
    return (
      <div className="forms-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="add-story-item-container">Edit Your Story!</h2>
          <div className="add-story-input-title add-story-item-container">
            <label> Edit Title</label>
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
            <label> Edit description</label>
            <input
              name="description"
              ref={register({ required: true, minLength: 2, maxLength: 200 })}

            />
            {errors.description && errors.description.type === 'required' && (
              <p>Required</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p>Description should not be longer than 250 characters</p>
            )}
          </div>
          <div className="add-story-input-content add-story-item-container">
            <label>Edit Story</label>
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
          <button className="add-username-btn btn" type="submit">Submit</button>
        </form>
      </div>

    )
  }

  return (
    <div className="add-story-container">
      {story ? forms() : null}
    </div>
  )
}

const mapStateToProps = ({ auth, story }) => {
  return { auth, story }
}


export default connect(mapStateToProps, { editStory })(EditStory);
