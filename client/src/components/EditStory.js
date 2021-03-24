import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editStory } from '../actions';


const EditStory = ({ auth, story, editStory, history }) => {
  const [title, setTitle] = useState(story.title);
  const [description, setDescription] = useState(story.description);
  const [content, setContent] = useState(story.content);


  const onSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    const creator = auth._id;
    const storyId = story._id;
    const postBody = { storyId, title, description, content, creator };
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
        <form onSubmit={onSubmit}>
          <h2 className="add-story-item-container">Edit Your Story!</h2>
          <div className="add-story-input-title add-story-item-container">
            <label> Edit Title</label>
            <input
              name="title"
              value={title}
              onChange={(e => setTitle(e.target.value))}
            />
          </div>
          <div className="add-story-input-description add-story-item-container">
            <label> Edit description</label>
            <input
              name="description"
              value={description}
              onChange={(e => setDescription(e.target.value))}
            />

          </div>
          <div className="add-story-input-content add-story-item-container">
            <label>Edit Story</label>
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


export default connect(mapStateToProps, { editStory })(EditStory);
