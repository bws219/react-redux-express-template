import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Comments from './Comments';
import { FormControl } from 'react-bootstrap';

class PostDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsShown: false,
      content: ""
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  openComments() {
    this.setState({ commentsShown: !this.state.commentsShown });
  }

  handleSubmit(event) {
    axios.post(BACKEND + '/comment/new', {
      content: this.state.content,
      postID: this.props.post.id,
      parentID: null
    }).then(() => {
      this.setState({ content: "" });
    }).catch(error => {
      console.log('Error posting:', error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="post">
        <div className="vote">
          <span className="glyphicon glyphicon-arrow-up" />
          <span>{this.props.post.points}</span>
          <span className="glyphicon glyphicon-arrow-down" />
        </div>
        <img className="post-img" src={this.props.post.image_url} alt="Could not load" />
        <div>
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.content}</p>
          <span onClick={() => this.openComments()}>
            Comments {
              this.state.commentsShown ?
              <span className="glyphicon glyphicon-menu-up" /> :
              <span className="glyphicon glyphicon-menu-down" />
            }
          </span>
          {
            this.state.commentsShown ?
            <Comments post={this.props.post.id} parent={this.props.post.id} /> :
            null
          }
        </div>
        <form className="comment-form">
          <label>Comment:
            <FormControl id="content-input" type="text"
              value={this.state.content} onChange={this.handleContentChange}
            />
          </label>
          <div className="form-buttons-bar">
            <button className="bottom-button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PostDisplay.propTypes = {
  post: PropTypes.object
};

export default PostDisplay;
