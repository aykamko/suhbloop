import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchResponse } from '../actions/api';

class Response extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    responseId: PropTypes.string.isRequired,
    responseData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch, responseId } = this.props;
    dispatch(fetchResponse(responseId));
  }

  render() {
    const { responseData, isFetching } = this.props;

    if (isFetching) {
      return <h1>fetching response</h1>;
    }

    return (
      <div>
        {JSON.stringify(responseData)}
      </div>
    );
  }
}

export default connect(({ responseReducer }, ownProps) => ({
  ...responseReducer,
  responseId: ownProps.params.responseId,
}))(Response);
