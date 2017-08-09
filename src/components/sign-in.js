import React, { Component} from 'react';
import { Link } from 'react-router';
import { signIn } from '../actions/auth-actions';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from "react-redux";
import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import { browserHistory } from 'react-router';

class SignIn extends Component {

  onSubmit(user_data) {
    axios.post(`${endpoints.API_BASE}${endpoints.SIGN_IN}`, {
      email: user_data.email,
      password: user_data.password,
    }).then(res => {
      this.props.signIn(res.data);
      browserHistory.push('/');
    });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

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
            </div>
            <div className="modal-footer">
              <div className="actions">
                <input type="submit" value="Sign In" className="btn btn-success btn-lg btn-block" />
              </div>
              <div>
                <Link to="/sign_up" className = "btn btn-link">Sign Up</Link>
              </div>
            </div>
         </form>
        </div>
      </div>
    );
  }
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='field'>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className='form-control'/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default connect(null, { signIn })(reduxForm({
  form: 'SignInForm',
  fields: ['email', 'password'],
})(SignIn));
