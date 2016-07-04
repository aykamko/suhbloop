import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchResponses } from '../actions/api';

class ResponseList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    responses: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchResponses());
  }

  render() {
    const { responses, isFetching, lastUpdated } = this.props;

    if (isFetching) {
      return <h1>fetching</h1>;
    }

    return (
      <div>
        <span>Last Updated: {lastUpdated}</span>
        <ul>
          {responses.map(response =>
            <li key={response.response_id}>{response.respondent_name}</li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { responseListReducer } = state;
  return responseListReducer;
}

export default connect(mapStateToProps)(ResponseList);
