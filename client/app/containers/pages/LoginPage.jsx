import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
// import auth from '../../utils/auth';
// import { login } from '../../actions/AppActions';
// import LoadingIndicator from '../LoadingIndicator.react';

export default class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { dispatch, formIsSubmitting } = this.props;
    return (
      <div className="form-page__wrapper">
        <div className="form-page__form-wrapper">
          <div className="form-page__form-header">
            <h2 className="form-page__form-heading">Login</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  _login = (username, password) => {
    debugger;
    // this.props.dispatch(login(username, password));
  }
}

// <LoginForm handleSubmit={this._login} submitting={formIsSubmitting} />

export default connect(({ loginPageReducer }) => loginPageReducer)(LoginPage);
