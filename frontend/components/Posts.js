import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import PostDisplay from './PostDisplay';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    axios.get(BACKEND + '/posts').then(resp => {
      this.setState({ posts: resp.data.posts });
    }).catch(e => console.log(e));
  }
  render() {
    return (
      <div>
        {this.state.posts.map(p => <PostDisplay key={p.id} post={p} />)}
      </div>
    );
  }
}

export default Posts;
