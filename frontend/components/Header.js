import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Title from './Title';
import PostCreate from './PostCreate';

const Header = ({ name }) => {
  return (
    <div className="header">
      <Title name={name} />
      <Link to="/login">Login or Register</Link>
      <PostCreate />
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
