import React from 'react';
import { connect } from 'react-redux';
import { Field, actions } from 'react-redux-form';

import validator from 'validator';

import Recipe from '../components/recipe-component';

const code = `
// Team Reducer
// ---------------------------------------------------
import { combineReducers } from 'redux';
import { createModelReducer } from 'react-redux-form';

// Array of all users
function membersReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, action.member];
    default:
      return state;
  }

}

const teamReducer = combineReducers({
  members: membersReducer,
  newMember: createModelReducer('team.newMember', {})
});

export default teamReducer;


// App Store
// ---------------------------------------------------
import { createStore, combineReducers } from 'redux';
import teamReducer from './reducers/team-reducer';

export default createStore(combineReducers({
  team: teamReducer
}));


// Form Component
// ---------------------------------------------------
class TeamForm extends React.Component {
  handleAddMember() {
    let { team: { newMember }, dispatch } = this.props;

    dispatch({
      type: 'ADD_MEMBER',
      member: newMember
    });

    dispatch(actions.reset('team.newMember'));
  }

  render() {
    let { team } = this.props;

    return (
      <form>
        <h2>Model in Nested State</h2>

        <Field model="team.newMember.name">
          <label>New Member Name:</label>
          <input type="text" value={ team.newMember.name }/>
        </Field>

        <button type="button"
          onClick={() => this.handleAddMember()}>
          Add Team Member
        </button>

        <ul>
        { team.members.map((member, i) => 
          <li key={i}>{ member.name }</li>
        )}
        </ul>
      </form>
    );
  }
}

export default connect(s => s)(TeamForm);
`

class NestedStateRecipe extends React.Component {
  handleAddMember() {
    let { team: { newMember }, dispatch } = this.props;

    dispatch({
      type: 'ADD_MEMBER',
      member: newMember
    });

    dispatch(actions.reset('team.newMember'));
  }

  render() {
    let { team } = this.props;

    return (
      <Recipe model="team" code={ code }>
        <h2>Model in Nested State</h2>

        <Field model="team.newMember.name">
          <label>New Member Name:</label>
          <input type="text" value={ team.newMember.name }/>
        </Field>

        <button type="button"
          onClick={() => this.handleAddMember()}>
          Add Team Member
        </button>

        <ul>
        { team.members.map((member, i) => 
          <li key={i}>{ member.name }</li>
        )}
        </ul>
      </Recipe>
    );
  }
}

export default connect(s => s)(NestedStateRecipe);
