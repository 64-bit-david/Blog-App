import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Header from './Header';


const App = ({ fetchPosts, posts }) => {

  useEffect(() => {
    fetchPosts();
  }, []);


  const renderPosts = () => {
    return posts.map(post => {
      return (
        <div key={post._id}>{post.title}</div>
      )
    })
  }

  return (
    <div>
      <Header />
      {renderPosts()}
    </div>
  )
}

const mapStateToProps = ({ posts }) => {
  return { posts }
}

export default connect(mapStateToProps, { fetchPosts })(App);
