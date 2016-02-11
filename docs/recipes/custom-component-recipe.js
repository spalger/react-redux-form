import React from 'react';
import { connect } from 'react-redux';
import { Field, actions } from 'react-redux-form';

import Select from 'react-select';

import Recipe from '../components/recipe-component';

class CustomComponentRecipe extends React.Component {
  render() {
    let { user, dispatch } = this.props;
    let options = [
      { value: 'haskell', label: 'Haskell' },
      { value: 'elm', label: 'Elm' },
      { value: 'ocaml', label: 'OCaml' },
      { value: 'elixir', label: 'Elixir' }
    ];

    return (
      <Recipe name="custom-component" model="user">
        <Select
          name="form-field-name"
          placeholder="Select a language..."
          value={ user.language }
          options={options}
          onChange={(val) => dispatch(actions.change('user.language', val))}
        />
      </Recipe>
    );
  }
}

export default connect(s => s)(CustomComponentRecipe);
