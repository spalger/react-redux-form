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
