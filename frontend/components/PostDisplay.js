import React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

class PostDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsShown: false
    };
  }
  openComments = () => {};
  render() {
    return (
      <div className="post">
        <div className="vote">
          <span className="glyphicon glyphicon-arrow-up" />
          <span>{this.props.post.points}</span>
          <span className="glyphicon glyphicon-arrow-down" />
        </div>
        <img className="post-img" src={this.props.post.image_url} alt="Could not load" />
        <div className="post-body">
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.content}</p>
          {/* <span onClick={() => this.openComments()}>
            Comments {
              this.state.commentsShown ?
              <span className="glyphicon glyphicon-menu-down" /> :
              <span className="glyphicon glyphicon-menu-up" />
            }
          </span>
          {
            this.state.commentsShown ?
            <Comments /> :
            null
          } */}
        </div>
      </div>
    );
  }
}

PostDisplay.propTypes = {
  post: PropTypes.object
};

export default PostDisplay;
