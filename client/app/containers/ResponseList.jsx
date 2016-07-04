import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchResponses } from '../actions/api';

class ResponseList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    responses: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element,
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
