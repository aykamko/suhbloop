import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { Link } from 'react-router';

export const responsesListRequest = createAction('RESPONSE_LIST_REQUEST');
export const responsesListSuccess = createAction('RESPONSE_LIST_SUCCESS', responseList => ({
  responseList,
  receivedAt: Date.now(),
}));
export const responsesListFailure = createAction('RESPONSE_LIST_FAILURE', err => err);

class ResponseList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    responseList: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(responsesListRequest());
  }

  render() {
    const { responseList, isFetching, lastUpdated } = this.props;

    if (isFetching) {
      return <h1>fetching</h1>;
    }

    return (
      <div>
        <span>Last Updated: {lastUpdated}</span>
        <ul>
          {responseList.map(response =>
            <li key={response.response_id}>
              <Link to={`/response/${response.response_id}`}>
                {response.respondent_name}
              </Link>
            </li>
          )}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state.responseListReducer)(ResponseList);
