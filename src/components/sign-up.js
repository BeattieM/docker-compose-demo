import React, { Component} from 'react';
import { Link } from 'react-router';
import { signUp } from '../actions/auth-actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import { browserHistory } from 'react-router';

class SignUp extends Component {

  onSubmit(user_data) {
    axios.post(`${endpoints.API_BASE}${endpoints.SIGN_UP}`, {
      user: user_data
    }).then(res => {
      this.props.signUp(res.data);
      browserHistory.push('/');
    });
  }

  render() {
    const { fields: { email, password, password_confirmation }, handleSubmit } = this.props;

    return (
      <div className="modal-content">
        <div className="modal-header center">
          <img id="img_logo" src="/images/pokeball.png" />
        </div>
        <div id="div-forms">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="modal-body">
              <Field name="email" type="email"
                component={renderField} label="Email"
              />
              <br />
              <Field name="password" type="password"
                component={renderField} label="Password"
              />
              <br />
              <Field name="password_confirmation" type="password"
                component={renderField} label="Password Confirmation"
              />
            </div>
            <div className="modal-footer">
              <div className="actions">
                <input type="submit" value="Sign up" className="btn btn-success btn-lg btn-block" />
              </div>
              <div>
                <Link to="/sign_in" className = "btn btn-link">Sign In</Link>
              </div>
            </div>
         </form>
        </div>
      </div>
    );
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be atleast 6 characters';
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required';
  } else if (values.password != values.password_confirmation) {
    errors.password_confirmation = 'Password does not match';
  }
  return errors;
};

export default connect(null, { signUp })(reduxForm({
  form: 'SignUpForm',
  fields: ['email', 'password', 'password_confirmation'],
  validate
})(SignUp));

