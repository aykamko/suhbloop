import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
// import * as suhBloopActionCreators from '../actions/suhBloopActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { $$suhBloopStore: state.$$suhBloopStore };
}

// Simple example of a React "smart" component
const SuhBloop = (props) => {
  const { dispatch, $$suhBloopStore } = props;
  // const actions = bindActionCreators(suhBloopActionCreators, dispatch);
  // const { updateName } = actions;
  const name = $$suhBloopStore.get('name');

  // This uses the ES2015 spread operator to pass properties as it is more DRY
  // This is equivalent to:
  // <SuhBloopWidget $$suhBloopStore={$$suhBloopStore} actions={actions} />
  return (
    <div>
      <button>Apply Now!</button>
      <button>Log In</button>
    </div>
  );
};

SuhBloop.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  //
  // // This corresponds to the value used in function select above.
  // // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
  // // This allows us to immediately know we don't call $$suhBloopStore['someProperty'], but
  // // instead use the Immutable.js `get` API for Immutable.Map
  // $$suhBloopStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

// Don't forget to actually use connect!
// Note that we don't export SuhBloop, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(SuhBloop);
