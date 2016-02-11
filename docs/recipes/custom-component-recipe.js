import React from 'react';
import { connect } from 'react-redux';
import { Field, actions, createFieldClass } from 'react-redux-form';

import TextField from 'material-ui/lib/text-field';
import Slider from 'material-ui/lib/slider';
import Checkbox from 'material-ui/lib/checkbox';

import Recipe from '../components/recipe-component';

const MaterialField = createFieldClass({
  'Slider': (props) => ({
    onChange: (e, val) => props.onChange(val),
    value: props.modelValue
  }),
  'Checkbox': (props) => ({
    onCheck: (e, val) => props.onChange(val),
    checked: !!props.modelValue
  })
},
{
  'TextField': 'text'
});

class CustomComponentRecipe extends React.Component {
  render() {
    let { user, dispatch } = this.props;

    return (
      <Recipe name="custom-component" model="user">
        <strong>Material Design</strong>
        <MaterialField model="user.name">
          <TextField />
        </MaterialField>

        <MaterialField model="user.age">
          <Slider step={1} value={25} max={100} />
        </MaterialField>

        <MaterialField model="user.lovesRedux">
          <Checkbox label="Love Redux?" />
        </MaterialField>
      </Recipe>
    );
  }
}

export default connect(s => s)(CustomComponentRecipe);
