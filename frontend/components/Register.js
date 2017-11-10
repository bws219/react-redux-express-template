import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    axios.post(BACKEND + '/register', {
      username: this.state.username,
      password: this.state.password
    })
    .then(resp => {
      console.log(resp.data);
      if (resp.status === 200) {
        this.props.history.push('/login');
      }
    })
    .catch(error => {
      console.log('Error registering:', error.response.data.message);
      this.setState({
        errorMessage: error.response.data.message
      });
    });
    event.preventDefault();
  }

  handleCancel(e) {
    this.props.history.push('/');
    e.preventDefault();
  }

  render() {
    return (
      <div className="page">
        <Link to="/">Back to Main Page</Link>
        <form className="form">
          <label>Username</label>
          <FormControl id="username-input" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          <label>Password</label>
          <FormControl id="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <div className="form-buttons-bar">
            <button className="cancel-button" onClick={() => this.handleCancel()}>
              Cancel
            </button>
            <button className="bottom-button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  history: PropTypes.object
};

export default RegistrationPage;
