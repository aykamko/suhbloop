import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const DashboardPage = (props) => (
  <div>
    <h1>You're logged in!</h1>
    <button
      onClick={() => {
        props.dispatch({ type: 'LOG_OUT' });
        props.dispatch(push('/login'));
      }}
    >Log Out</button>
  </div>
);
DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DashboardPage);
