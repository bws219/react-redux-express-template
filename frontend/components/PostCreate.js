import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { FormControl } from 'react-bootstrap';


class PostCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', content: ''};

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    axios.post(BACKEND + '/post/new', {
      title: this.state.title,
      content: this.state.content
    }, { withCredentials: true })
    .then(resp => {
      // console.log(resp);
      if (resp.status === 200) {
        this.props.history.push('/');
      }
    })
    .catch(error => {
      console.log('Error posting:', error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="form">
          <label>Title</label>
          <FormControl id="title-input" type="text" value={this.state.title} onChange={this.handleTitleChange} />
          <label>Content</label>
          <FormControl id="content-input" type="text" value={this.state.content} onChange={this.handleContentChange} />
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

PostCreate.propTypes = {
  history: PropTypes.object
};

export default PostCreate;
