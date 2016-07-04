import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Index = (props) => {
  const { appConfig } = props;
  return (
    <div>
      <ul>
        <li><a target="_blank" href={appConfig.googleFormUrl}>Apply Now!</a></li>
        <li><Link to="/responses">See Responses</Link></li>
      </ul>
    </div>
  );
};
Index.propTypes = {
  appConfig: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => state.indexReducer)(Index);
