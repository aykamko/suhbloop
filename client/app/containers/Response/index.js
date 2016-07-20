import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';

export const responseRequest = createAction('RESPONSE_REQUEST', id => ({ id }));
export const responseSuccess = createAction('RESPONSE_SUCCESS', (id, response) => ({
  id,
  response,
  receivedAt: Date.now(),
}));
export const responseFailure = createAction('RESPONSE_FAILURE', err => err);

class Response extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    responseId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    response: PropTypes.object,
    err: PropTypes.string,
  }

  static defaultProps = {
    isFetching: false,
  };

  componentDidMount() {
    this._maybeRequestResponse(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.responseId === this.props.responseId) return;
    this._maybeRequestResponse(nextProps);
  }

  _maybeRequestResponse = (props) => {
    const { dispatch, response, responseId } = props;
    if (response) return;
    dispatch(responseRequest(responseId));
  }

  render() {
    const { err, response, isFetching } = this.props;

    if (isFetching) {
      return <h1>fetching response</h1>;
    }

    if (err) {
      return <h1>{err}</h1>;
    }

    return (
      <div>
        {JSON.stringify(response)}
      </div>
    );
  }
}

export default connect(({ responseListReducer }, ownProps) => ({
  responseId: ownProps.params.responseId, // from react-router
  ...responseListReducer.responseData[ownProps.params.responseId],
}))(Response);
