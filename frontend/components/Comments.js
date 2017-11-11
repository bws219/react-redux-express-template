import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { FormControl } from 'react-bootstrap';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsShown: false,
      content: ""
    };

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentWillMount() {
    axios.get(BACKEND + '/comments/' + this.props.parent).then(resp => {
      this.setState({ comments: resp.data.comment });
    }).catch(e => console.log(e));
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  openComments() {
    this.setState({ commentsShown: !this.state.commentsShown });
  }

  handleSubmit(event, id) {
    axios.post(BACKEND + '/comment/new', {
      content: this.state.content,
      postID: this.props.post,
      parentID: id
    }).then(() => {
      this.setState({ content: "" });
    }).catch(error => {
      console.log('Error posting:', error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {
          this.state.comments.map(m => (
            <div key={m.id} className="comment">
              <div className="vote">
                <span className="glyphicon glyphicon-arrow-up" />
                <span>{this.props.post.points}</span>
                <span className="glyphicon glyphicon-arrow-down" />
              </div>
              <div>
                <h3>{m.fk_author_id}</h3>
                <p>{m.content}</p>
                <span onClick={() => this.openComments()}>
                  Comments {
                    this.state.commentsShown ?
                    <span className="glyphicon glyphicon-menu-up" /> :
                    <span className="glyphicon glyphicon-menu-down" />
                  }
                </span>
                {
                  this.state.commentsShown ?
                  <Comments post={this.props.post} parent={m.id} /> :
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
                  <button className="bottom-button" onClick={(e) => this.handleSubmit(e, m.id)}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ))
        }
      </div>
    );
  }
}

Comments.propTypes = {
  parent: PropTypes.number,
  post: PropTypes.number
};

export default Comments;
