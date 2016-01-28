import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, getField, actions } from 'react-redux-form';

import validator from 'validator';

import Recipe from '../components/recipe-component';

const code = `
const isRequired = (value) => !validator.isNull(value);

function fooAsyncSubmit(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let errors = {};

      if (data.username !== 'John' || data.password !== 'password') {
        return reject();
      } 

      return resolve();
    }, 1000);
  });
}

function fooSubmitAction(data) {
  return (dispatch) => {
    dispatch(actions.asyncSetValidity('user', (response, done) => {
      fooAsyncSubmit(data)
        // Credentials are correct!
        .then(() => {
          done({
            credentials: true
          });

          dispatch(actions.setSubmitted('user'));
        })

        // Credentials are incorrect :(
        .catch(() => {
          done({
            credentials: false
          });
        });
    }));
  }
}

class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(fooSubmitAction(this.props.user));
  }

  render() {
    let { user, userForm } = this.props;

    return (
      <Recipe model="user" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Validation on Submit</h2>
        <p>Psst... the username is <strong>John</strong> and the password is <strong>password</strong></p>
        <Field model="user.username">
          <label>Username</label>
          <input type="text" />
        </Field>
        { getField(userForm, 'username').pending &&
          <span>Validating...</span>
        }
        { getField(userForm, 'username').errors.available &&
          <span>Sorry, that username is taken.</span>
        }
        <Field model="user.password">
          <label>Password</label>
          <input type="password" />
        </Field>
        { userForm.errors.credentials
          && <div className="rsf-error">Those credentials are incorrect.</div>
        }
        { userForm.submitted
          ? <div>You are now logged in.</div>
          : <button disabled={ userForm.pending }>
              { userForm.pending ? 'Submitting...' : 'Submit' }
            </button>
        }
      </Recipe>
    );
  }
}

export default connect(s => s)(UserForm);
`

const isRequired = (value) => !validator.isNull(value);

function fooAsyncSubmit(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let errors = {};

      if (data.username !== 'John' || data.password !== 'password') {
        return reject();
      } 

      return resolve();
    }, 1000);
  });
}

function fooSubmitAction(data) {
  return (dispatch) => {
    dispatch(actions.asyncSetValidity('submitValidUser', (response, done) => {
      fooAsyncSubmit(data)
        .then(() => {
          done({
            credentials: true
          });

          dispatch(actions.setSubmitted('submitValidUser'));
        })
        .catch(() => {
          done({
            credentials: false
          });
        });
    }));
  }
}

class SyncValidationRecipe extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(fooSubmitAction(this.props.submitValidUser));
  }

  render() {
    let { submitValidUser, submitValidUserForm } = this.props;

    return (
      <Recipe model="submitValidUser" code={code} onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Validation on Submit</h2>
        <p>This shows how you can add your own custom submit handler that returns validation.</p>
        <p>Psst... the username is <strong>John</strong> and the password is <strong>password</strong></p>
        <Field model="submitValidUser.username">
          <label>Username</label>
          <input type="text" />
        </Field>
        { getField(submitValidUserForm, 'username').pending &&
          <span>Validating...</span>
        }
        { getField(submitValidUserForm, 'username').errors.available &&
          <span>Sorry, that username is taken.</span>
        }
        <Field model="submitValidUser.password">
          <label>Password</label>
          <input type="password" />
        </Field>
        { submitValidUserForm.errors.credentials
          && <div className="rsf-error">Those credentials are incorrect.</div>
        }
        {
          submitValidUserForm.submitted
          ? <div>You are now logged in.</div>
          : <button disabled={ submitValidUserForm.pending }>
              { submitValidUserForm.pending ? 'Submitting...' : 'Submit' }
            </button>
        }
      </Recipe>
    );
  }
}

export default connect(s => s)(SyncValidationRecipe);
