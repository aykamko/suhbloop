import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
// import * as suhBloopActionCreators from '../actions/suhBloopActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { $$suhBloopStore: state.$$suhBloopStore };
}

// Simple example of a React "smart" component
const SuhBloop = (props) => {
  const { /* dispatch, */ $$suhBloopStore } = props;

  return (
    <div>
      <a href={$$suhBloopStore.get('appConfig').get('googleFormUrl')}>Apply Now!</a>
      <button>Log In</button>
    </div>
  );
};

SuhBloop.propTypes = {
  dispatch: PropTypes.func.isRequired,
  $$suhBloopStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(SuhBloop);
