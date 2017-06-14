import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { signupUser } from '../../actions';
const validator = require('email-validator');

class Signup extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps)
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { name, email, password, passwordConfirm, phone }} = this.props;
    return (
      <div>
        <form className='signup' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
            <label>* Name:</label>
            <input placeholder='Mark' className='form-control' {...name} />
            {name.touched && name.error && <div className='alert alert-danger'><strong>{name.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>* Email:</label>
            <input placeholder='Uktar@email.com' className='form-control' {...email} />
            {email.touched && email.error && <div className='alert alert-danger'><strong>{email.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>* Password:</label>
            <input type='password' placeholder='Password' className='form-control' {...password} />
            {password.touched && password.error && <div className='alert alert-danger'><strong>{password.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>* Confirm Password:</label>
            <input type='password' placeholder='Confirm Password' className='form-control' {...passwordConfirm} />
            {passwordConfirm.touched && passwordConfirm.error && <div className='alert alert-danger'><strong>{passwordConfirm.error}</strong></div>}
          </fieldset>
          <fieldset className='form-group'>
            <label>Phone Number:</label>
            <input placeholder='555-555-5555' className='form-control' {...phone} />
            {phone.touched && phone.error && <div className='alert alert-danger'><strong>{passwordConfirm.error}</strong></div>}
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const { password, passwordConfirm, email, name } = formProps;
  const errors = {};

  if (!name) {
    errors.name = 'Please enter a name';
  }

  if (!validator.validate(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (password !== passwordConfirm) {
    errors.password = 'Password must match';
  }

  // if (!phoneRegex.test(phone)) {
  //   errors.phone = 'Please enter a valid phone number';
  // }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: [ 'name', 'email', 'password', 'passwordConfirm', 'phone' ],
  validate
}, mapStateToProps, { signupUser })(Signup);