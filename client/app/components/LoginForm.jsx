import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={data => {
      debugger;
    }}>
      <div>
        <label>Username</label>
        <Field name="username" component="input" type="text" placeholder="frank.underwood"/>
      </div>
      <div>
        <label>Password</label>
        <Field name="password" component="input" type="text" placeholder="********"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'LoginForm',
})(LoginForm)
